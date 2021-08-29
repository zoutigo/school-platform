import React from 'react'
import { useForm } from 'react-hook-form'
import PropTypes from 'prop-types'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch, useSelector } from 'react-redux'
import { useMutation } from 'react-query'
import { Grid, useTheme } from '@material-ui/core'
import { StyledPersoDataContainer, StyledPersoDataForm } from './Style'
import CustomButton from '../../../../elements/CustomButton'

import InputTextControl from '../../../../elements/InputTextControl'
// eslint-disable-next-line import/named
import { useUpdateMutationOptions } from '../../../../../utils/hooks'
import { apiUpdateUser } from '../../../../../utils/api'
import {
  updateUserChildrenClassesSchema,
  updateUserCredentialsSchema,
  updateUserPasswordSchema,
} from '../../../../../schemas/updateUserSchema'
import InputSelectControl from '../../../../elements/InputSelectControl'
import InputSelectMultiControl from '../../../../elements/InputSelectMultiControl'
import {
  setUserInfos,
  setUserToken,
} from '../../../../../redux/user/UserActions'
import tokenDatas from '../../../../../utils/tokenDatas'
import { setPrivateAccountMutateAlert } from '../../../../../redux/alerts/AlertsActions'
import {
  classroomsOptions,
  genderOptions,
} from '../../../../../constants/options'

function PersoDataForm({ setForm, setToggle, form, data }) {
  const theme = useTheme()
  const dispatch = useDispatch()
  const {
    User: { id },
    Token,
  } = useSelector((state) => state.user)
  const queryKey = [`datas-${id}`]
  const { mutateAsync } = useMutation(
    apiUpdateUser,
    useUpdateMutationOptions(queryKey)
  )
  const { credentialsform, childrenform, passwordform } = form

  const type = Object.entries(form).find(([, value]) => value)

  const [formtype] = type

  const schema = () => {
    switch (formtype) {
      case 'credentialsform':
        return updateUserCredentialsSchema
      case 'childrenform':
        return updateUserChildrenClassesSchema
      case 'passwordform':
        return updateUserPasswordSchema
      default:
        return updateUserCredentialsSchema
    }
  }

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema()),
  })

  const onSubmit = async (datas) => {
    const {
      firstname,
      lastname,
      phone,
      gender,
      childrenClasses,
      password,
      newPassword,
      newPasswordConfirm,
    } = datas

    const finalDatas = () => {
      switch (formtype) {
        case 'credentialsform':
          return { firstname, lastname, phone, gender: gender.value }
        case 'passwordform':
          return { password, newPassword, newPasswordConfirm }
        case 'childrenform':
          return {
            childrenClasses: childrenClasses.map(
              (classroom) => classroom.value
            ),
          }

        default:
          return null
      }
    }

    const options = {
      headers: {
        'x-access-token': Token,
      },
    }

    try {
      await mutateAsync({
        id: id,
        action: 'update',
        options: options,
        body: finalDatas(),
        token: Token,
      }).then((response) => {
        if (response.status === 200) {
          const { newToken, newDatas } = tokenDatas(response)
          dispatch(setUserInfos(newDatas))
          dispatch(setUserToken(newToken))
          dispatch(
            setPrivateAccountMutateAlert({
              openAlert: true,
              severity: 'success',
              alertText: response.data.message,
            })
          )

          setToggle('list')
          setForm({
            credentialsform: false,
            childrenform: false,
            rolesform: false,
            passwordform: false,
            usnubscribeform: false,
            statusform: false,
            gradeform: false,
          })
          window.scrollTo(0, 0)
        }
      })
    } catch (err) {
      console.log('Err:', err)
      console.log('ErrResponse:', err.response)
      console.log('ErrMessage:', err.message)
      console.log('ErrRespoData:', err.response.data)
      console.log('ErrRespoDataMessage:', err.response.data)
      const message = err.response.data.message || err.message

      dispatch(
        setPrivateAccountMutateAlert({
          openAlert: true,
          severity: 'error',
          alertText: message,
        })
      )

      window.scrollTo(0, 0)
    }
  }

  const initialClassrooms = data.entities
    ? data.entities.map((classroom) => {
        const { name: entityname, alias: entityalias } = classroom
        return {
          label: entityname,
          value: entityalias,
        }
      })
    : null

  const initialGender = data.gender
    ? { label: data.gender, value: data.gender }
    : { label: 'madame', value: 'madame' }

  return (
    <StyledPersoDataContainer container>
      <StyledPersoDataForm onSubmit={handleSubmit(onSubmit)}>
        {credentialsform && (
          <Grid container className="form-fields-container">
            <InputSelectControl
              control={control}
              name="gender"
              initialValue={initialGender}
              label="Civilité"
              options={genderOptions}
            />
            <InputTextControl
              name="firstname"
              control={control}
              initialValue={data ? data.firstname : null}
              helperText="au moins 2 caractères"
              label="Votre Prénom"
              width="100%"
            />
            <InputTextControl
              name="lastname"
              control={control}
              initialValue={data ? data.lastname : null}
              helperText="au moins 2 caractères"
              label="Votre nom"
              width="100%"
            />
            <InputTextControl
              name="phone"
              control={control}
              initialValue={data ? data.phone : null}
              helperText="ex: 0618657934 ou +33178569054"
              label="Votre numéro de téléphone"
              width="100%"
            />
          </Grid>
        )}
        {childrenform && (
          <Grid container className="form-fields-container">
            <InputSelectMultiControl
              name="childrenClasses"
              options={classroomsOptions}
              control={control}
              label="Choisir la classe :"
              initialValue={initialClassrooms}
            />
          </Grid>
        )}
        {passwordform && (
          <Grid container className="form-fields-container">
            <InputTextControl
              name="password"
              type="password"
              label="Ancien mot de pass"
              placeholder="FureurVosgienne8854"
              helperText="8 caractères minimum, dont au moins 1 majuscules, 1 majuscule 1 chiffre"
              width="100%"
              control={control}
            />
            <InputTextControl
              name="newPassword"
              type="password"
              label="Nouveau mot de pass"
              placeholder="FureurVosgienne8854"
              helperText="8 caractères minimum, dont au moins 1 majuscules, 1 majuscule 1 chiffre"
              width="100%"
              control={control}
            />
            <InputTextControl
              name="newPasswordConfirm"
              type="password"
              label="Confirmer le nouveau mot de pass"
              placeholder="FureurVosgienne8854"
              helperText="8 caractères minimum, dont au moins 1 majuscules, 1 majuscule 1 chiffre"
              width="100%"
              control={control}
            />
          </Grid>
        )}

        <Grid item container alignItems="center" justify="flex-end">
          <CustomButton
            text="je poste mes informations"
            bgcolor={theme.palette.success.main}
            action="post"
            width="300px"
            type="submit"
            disabled={!isValid || isSubmitting}
          />
        </Grid>
      </StyledPersoDataForm>
    </StyledPersoDataContainer>
  )
}

PersoDataForm.defaultProps = {
  form: {
    credentialsform: true,
  },
}

PersoDataForm.propTypes = {
  setForm: PropTypes.func.isRequired,
  form: PropTypes.shape({
    credentialsform: PropTypes.bool,
    childrenform: PropTypes.bool,
    rolesform: PropTypes.bool,
    passwordform: PropTypes.bool,
  }),
  setToggle: PropTypes.func.isRequired,
  data: PropTypes.shape({
    phone: PropTypes.string,
    email: PropTypes.string,
    lastname: PropTypes.string,
    firstname: PropTypes.string,
    gender: PropTypes.string,
    entities: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        alias: PropTypes.string,
      })
    ),
  }).isRequired,
}

export default PersoDataForm
