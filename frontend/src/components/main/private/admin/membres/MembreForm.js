import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import { Grid, styled } from '@material-ui/core'
import InputSelectMultiControl from '../../../../elements/InputSelectMultiControl'
import { apiFetchRoles, apiUpdateUser } from '../../../../../utils/api'
import CustomButton from '../../../../elements/CustomButton'
import { useUpdateMutationOptions } from '../../../../../utils/hooks'
import { setMembresMutateAlert } from '../../../../../redux/alerts/AlertsActions'

const StyledForm = styled('form')(() => ({
  width: '100%',
}))
function MembreForm({ setShowMembreForm, user }) {
  const rolesQueryKey = ['listes-roles']
  const userQueryKey = [`${user.id}`]
  const dispatch = useDispatch()
  const { Token } = useSelector((state) => state.user)
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm({
    mode: 'onChange',
    // resolver: yupResolver(schema()),
  })

  const { isLoading, isError, data, error } = useQuery(rolesQueryKey, () =>
    apiFetchRoles()
  )
  const { mutateAsync } = useMutation(
    apiUpdateUser,
    useUpdateMutationOptions(userQueryKey)
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
    user.roles && user.roles.length > 1
      ? user.roles.map(({ name, id }) => ({ value: id, label: name }))
      : '',
    [user.roles]
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
        id: user.id,
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
      <Grid container className="form-fields-container">
        <InputSelectMultiControl
          name="roles"
          options={rolesOptions()}
          control={control}
          label="Choisir le role :"
          initialValue={initialRoles}
        />
      </Grid>
      <Grid item container>
        <CustomButton type="submit" text="Je valide la modification" />
      </Grid>
    </StyledForm>
  )
}

MembreForm.defaultProps = {
  user: {
    roles: null,
  },
}

MembreForm.propTypes = {
  setShowMembreForm: PropTypes.func.isRequired,
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

export default MembreForm
