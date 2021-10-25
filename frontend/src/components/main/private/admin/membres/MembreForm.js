/* eslint-disable import/named */
import React, { useCallback } from 'react'
import SendIcon from '@material-ui/icons/Send'
import { useSnackbar } from 'notistack'
import Select from 'react-select'

import PropTypes from 'prop-types'
import CircularProgress from '@material-ui/core/CircularProgress'
// import Select from 'react-select'
import { useSelector } from 'react-redux'
import { Controller, useForm } from 'react-hook-form'

import { styled } from '@material-ui/styles'

import { Grid, Collapse } from '@material-ui/core'
import useMutate from '../../../../hooks/useMutate'
import { apiFetchRoles, apiUpdateUser } from '../../../../../utils/api'
import { membreUserSchema } from '../../../../../schemas/membreSchema'
import StyledBasicButton from '../../../../styled-components/StyledBasicButton'
import useFetch from '../../../../hooks/useFetch'
import AlertMessage from '../../../../elements/AlertMessage'
import getError from '../../../../../utils/getError'
import customStyles from '../../../../../constants/selectMultiCostumStyles'
import getResponse from '../../../../../utils/getResponse'

const StyledForm = styled('form')(() => ({
  width: '100%',
}))

const StyledSelectGrid = styled(Grid)(({ theme }) => ({
  // '& .MuiTextField-root': {
  //   margin: theme.spacing(1),
  //   width: '25ch',
  // },
}))

function MembreForm({ setShowMembreForm, user, queryKey }) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const rolesQueryKey = ['listes-roles']
  const { Token } = useSelector((state) => state.user)
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid, errors },
    setValue,
  } = useForm({
    mode: 'onChange',
  })

  const { isLoading, isError, data, errorMessage } = useFetch(
    rolesQueryKey,
    null,
    apiFetchRoles
  )

  const { mutateAsync } = useMutate(queryKey, apiUpdateUser)

  const rolesOptions = useCallback(() => {
    if (data && Array.isArray(data) && data.length > 0)
      return data.map(({ name, id, entity }) => ({
        value: id,
        label: `${name}-${entity.name}`,
      }))
    return null
  }, [data])

  const initialRoles = useCallback(
    user && user.roles && Array.isArray(user.roles) && user.roles.length > 0
      ? user.roles.map((role) => ({
          value: role.id,
          label: `${role.name}-${role.entity.name}`,
        }))
      : [],
    [user]
  )

  const onSubmit = async (datas) => {
    const { roles } = datas

    const finalDatas = {
      roles: roles.map((role) => role.value),
    }

    const options = {
      headers: {
        'x-access-token': Token,
      },
    }
    closeSnackbar()

    try {
      await mutateAsync({
        id: user ? user.id : null,
        action: 'update',
        options: options,
        body: finalDatas,
        token: Token,
      }).then((response) => {
        if (response.status === 200) {
          enqueueSnackbar(getResponse(response), { variant: 'success' })
          enqueueSnackbar(response.data.message, { variant: 'success' })
          setValue('roles', [])
          setShowMembreForm(false)
          window.scrollTo(0, 0)
        }
      })
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: 'error' })
    }
  }

  return (
    <StyledForm
      onSubmit={handleSubmit(onSubmit)}
      data-testid="membre-form"
      role="form"
    >
      {(isError || !user) && (
        <Grid container>
          <AlertMessage
            severity="error"
            message={errorMessage || 'aucun utilisateur à definir'}
          />
        </Grid>
      )}
      {isLoading && (
        <Grid container>
          <CircularProgress color="secondary" />
        </Grid>
      )}
      {data && (
        <Grid item container>
          <StyledSelectGrid container justifyContent="flex-start">
            {/* <InputSelectMultiControl
              name="roles"
              options={rolesOptions()}
              control={control}
              label="Choisir le role :"
              initialValue={initialRoles}
            /> */}
            <Grid item container className="field">
              <Grid
                item
                container
                justifyContent="center"
                style={{ marginTop: '3rem' }}
              >
                <Controller
                  control={control}
                  name="roles"
                  defaultValue={initialRoles}
                  // rules={{
                  //   required: 'selectionner un role au moins',
                  // }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      placeholder="Choisir un ou plusieurs roles"
                      inputRef={field.ref}
                      options={rolesOptions()}
                      isMulti
                      styles={customStyles}
                      // defaultValue={initialRoles}
                      defaultOptions
                      maxMenuHeight={200}
                    />
                  )}
                />
              </Grid>
              <Collapse in={Boolean(errors.roles)}>
                <Grid item container>
                  <AlertMessage
                    severity="error"
                    message={errors.roles ? errors.roles.message : ''}
                  />
                </Grid>
              </Collapse>
            </Grid>
          </StyledSelectGrid>
          <Grid
            item
            container
            justifyContent="flex-end"
            style={{ marginTop: '12rem', zIndex: 10 }}
          >
            <StyledBasicButton
              variant="contained"
              startIcon={<SendIcon />}
              className="button"
              type="submit"
              color="secondary"
              fullWidth
            >
              Je valide la modification
            </StyledBasicButton>
          </Grid>
        </Grid>
      )}
    </StyledForm>
  )
}

MembreForm.defaultProps = {
  user: null,
}

MembreForm.propTypes = {
  setShowMembreForm: PropTypes.func.isRequired,
  queryKey: PropTypes.arrayOf(PropTypes.string).isRequired,
  user: PropTypes.shape({
    id: PropTypes.number,
    roles: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      })
    ),
  }),
}

export default React.memo(MembreForm)
