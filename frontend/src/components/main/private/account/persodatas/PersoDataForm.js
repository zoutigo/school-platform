import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import PropTypes from 'prop-types'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch, useSelector } from 'react-redux'
import { useSnackbar } from 'notistack'
import {
  Grid,
  useTheme,
  List,
  ListItem,
  TextField,
  Select,
  MenuItem,
  styled,
} from '@material-ui/core'
import { StyledPersoDataContainer, StyledPersoDataForm } from './Style'
import CustomButton from '../../../../elements/CustomButton'

import InputTextControl from '../../../../elements/InputTextControl'
// eslint-disable-next-line import/named
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
import {
  classroomsOptions,
  genderOptions,
} from '../../../../../constants/options'
import useMutate from '../../../../hooks/useMutate'
import MutateCircularProgress from '../../../../elements/MutateCircularProgress'
import getError from '../../../../../utils/getError'
import getResponse from '../../../../../utils/getResponse'

const StyledForm = styled('form')(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    width: '100%',
  },
}))

function PersoDataForm({ setForm, setToggle, form, data }) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const theme = useTheme()
  const dispatch = useDispatch()
  const {
    User: { id },
    Token,
  } = useSelector((state) => state.user)
  const queryKey = [`datas-${id}`]

  const { mutateAsync, isMutating } = useMutate(queryKey, apiUpdateUser)

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
    formState: { isSubmitting, isValid, errors },
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
    closeSnackbar()
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
          enqueueSnackbar(getResponse(response), { variant: 'success' })

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
      enqueueSnackbar(getError(err), { variant: 'error' })
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
      {isMutating && <MutateCircularProgress />}
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        {credentialsform && (
          <List>
            {/* <ListItem>
              <Controller
                control={control}
                name="gender"
                defaultValue={initialGender}
                rules={{
                  required: 'indiquez votre civilité',
                }}
                render={({ field }) => (
                  <TextField
                    id="gender"
                    name="gender"
                    label="Civilité"
                    placeholder="homme ou femme ?"
                    variant="outlined"
                    fullWidth
                    select
                    SelectProps={{
                      native: true,
                    }}
                    onChange={(e) => field.onChange(e.target.value)}
                    error={Boolean(errors.partner1Name)}
                    helperText={
                      errors.partner1Name ? errors.partner1Name.message : ''
                    }
                    {...field}
                  >
                    {genderOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                )}
              />
            </ListItem> */}
            <ListItem>
              <InputSelectControl
                control={control}
                name="gender"
                initialValue={initialGender}
                label="Civilité"
                options={genderOptions}
              />
            </ListItem>
            <ListItem>
              <InputTextControl
                name="firstname"
                control={control}
                initialValue={data ? data.firstname : null}
                helperText="au moins 2 caractères"
                label="Votre Prénom"
                width="100%"
              />
            </ListItem>
            <ListItem>
              <InputTextControl
                name="lastname"
                control={control}
                initialValue={data ? data.lastname : null}
                helperText="au moins 2 caractères"
                label="Votre nom"
                width="100%"
              />
            </ListItem>
            <ListItem>
              <InputTextControl
                name="phone"
                control={control}
                initialValue={data ? data.phone : null}
                helperText="ex: 0618657934 ou +33178569054"
                label="Votre numéro de téléphone"
                width="100%"
              />
            </ListItem>
          </List>
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
      </StyledForm>
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
