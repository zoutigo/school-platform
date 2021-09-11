/* eslint-disable import/named */
import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery } from 'react-query'
import { Grid, styled, useTheme } from '@material-ui/core'
import InputSelectMultiControl from '../../../../elements/InputSelectMultiControl'
import { apiFetchRoles, apiUpdateUser } from '../../../../../utils/api'
import CustomButton from '../../../../elements/CustomButton'
import { useUpdateMutationOptions } from '../../../../../utils/hooks'
import { setMembresMutateAlert } from '../../../../../redux/alerts/AlertsActions'
import { membreUserSchema } from '../../../../../schemas/membreSchema'

const StyledForm = styled('form')(() => ({
  width: '100%',
}))
function MembreForm({ setShowMembreForm, user, queryKey }) {
  const theme = useTheme()
  const rolesQueryKey = ['listes-roles']
  const dispatch = useDispatch()
  const { Token } = useSelector((state) => state.user)
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(membreUserSchema),
  })

  const { isLoading, isError, data, error } = useQuery(rolesQueryKey, () =>
    apiFetchRoles()
  )
  const { mutateAsync } = useMutation(
    apiUpdateUser,
    useUpdateMutationOptions(queryKey)
  )

  const rolesOptions = useCallback(() => {
    if (data && Array.isArray(data) && data.length > 0)
      return data.map(({ name, id, entity }) => ({
        value: id,
        label: `${name}-${entity.name}`,
      }))
    return null
  }, [data])

  const initialRoles = useCallback(
    user && user.roles && user.roles.length > 1
      ? user.roles.map((role) => ({
          value: role.id,
          label: `${role.name}-${role.entity.name}`,
        }))
      : '',
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

    try {
      await mutateAsync({
        id: user ? user.id : null,
        action: 'update',
        options: options,
        body: finalDatas,
        token: Token,
      }).then((response) => {
        if (response.status === 200) {
          dispatch(
            setMembresMutateAlert({
              openAlert: true,
              severity: 'success',
              alertText: response.data.message,
            })
          )
          setShowMembreForm(false)

          window.scrollTo(0, 0)
        }
      })
    } catch (err) {
      dispatch(
        setMembresMutateAlert({
          openAlert: true,
          severity: 'error',
          alertText: err.response.data.message,
        })
      )
      setShowMembreForm(false)

      window.scrollTo(0, 0)
    }
  }

  return (
    <StyledForm on onSubmit={handleSubmit(onSubmit)}>
      <Grid
        container
        className="form-fields-container"
        style={{ paddingLeft: '1rem' }}
      >
        <InputSelectMultiControl
          name="roles"
          options={rolesOptions()}
          control={control}
          label="Choisir le role :"
          initialValue={initialRoles}
        />
      </Grid>
      <Grid item container>
        <CustomButton
          type="submit"
          text="Je valide la modification"
          disabled={isSubmitting}
          action="post"
          bgcolor={theme.palette.success.main}
          style={{ color: theme.palette.secondary.main }}
          width="300px"
        />
      </Grid>
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
    id: PropTypes.string,
    roles: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
      })
    ),
  }),
}

export default React.memo(MembreForm)
