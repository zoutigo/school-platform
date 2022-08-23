import React, { useCallback, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { useSnackbar } from 'notistack'
import {
  Grid,
  List,
  ListItem,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  styled,
} from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import Select from 'react-select'
import { StyledPersoDataContainer } from './Style'

// eslint-disable-next-line import/named
import {
  apiFecthEntities,
  apiFecthEntity,
  apiUpdateUser,
} from '../../../../../utils/api'

import {
  setUserInfos,
  setUserToken,
} from '../../../../../redux/user/UserActions'
import tokenDatas from '../../../../../utils/tokenDatas'
import {
  genderOptions,
  classroomsOptions,
} from '../../../../../constants/options'
import useMutate from '../../../../hooks/useMutate'
import MutateCircularProgress from '../../../../elements/MutateCircularProgress'
import getError from '../../../../../utils/getError'
import getResponse from '../../../../../utils/getResponse'
import customStyles from '../../../../../constants/selectMultiCostumStyles'
import useFetch from '../../../../hooks/useFetch'

const StyledForm = styled('form')(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    width: '100%',
  },
}))

function PersoDataForm({ setForm, setToggle, form, data }) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  const dispatch = useDispatch()
  const [showPassword, setShowPassword] = useState(false)
  const {
    User: { uuid },
    Token,
  } = useSelector((state) => state.user)
  const queryKey = [`datas-${uuid}`]

  const { mutateAsync, isMutating } = useMutate(queryKey, apiUpdateUser)

  const { credentialsform, childrenform, passwordform } = form

  const type = Object.entries(form).find(([, value]) => value)

  const [formtype] = type

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid, errors },
    getValues,
    setValue,
  } = useForm({
    mode: 'onChange',
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
            // childrenClasses: childrenClasses.map(
            //   (classroom) => classroom.value
            // ),
            classrooms: childrenClasses.map((classroom) => classroom.value),
          }

        default:
          return null
      }
    }

    closeSnackbar()
    try {
      await mutateAsync({
        uuid,
        // action: 'update',
        // options: options,
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
        const { uuid: entityUuid, alias: entityAlias } = classroom
        return {
          label: entityAlias,
          value: entityUuid,
        }
      })
    : null

  const initialGender = data.gender
    ? { label: data.gender, value: data.gender }
    : { label: 'madame', value: 'madame' }

  const handleClickShowPassword = () => setShowPassword(!showPassword)

  const queryKeyClassrooms = ['classrooms']
  const queryParamsClassrooms = ''
  const {
    isLoading,
    isError,
    data: entities,
    errorMessage,
  } = useFetch(queryKeyClassrooms, queryParamsClassrooms, apiFecthEntities)

  const classroomList = useCallback(() => {
    if (entities && Array.isArray(entities.datas)) {
      const classroomsDefinition = [
        'cm2',
        'cm1',
        'ce2',
        'ce1',
        'cp',
        'gs',
        'ms',
        'ps',
        'adaptation',
      ]
      return entities.datas
        .map(
          ({
            uuid: classroomUuid,
            name: classroomName,
            alias: classroomAlias,
          }) => ({
            uuid: classroomUuid,
            name: classroomName,
            alias: classroomAlias,
          })
        )
        .filter((classroom) => classroomsDefinition.includes(classroom.alias))
        .map((classroom) => ({
          label: classroom.alias,
          value: classroom.uuid,
        }))
        .sort(
          (a, b) =>
            classroomsDefinition.indexOf(a.label) -
            classroomsDefinition.indexOf(b.label)
        )
    }
    return null
  }, [entities])

  return (
    <StyledPersoDataContainer container>
      {isMutating && <MutateCircularProgress />}
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        {credentialsform && (
          <List>
            <ListItem>
              <Controller
                control={control}
                name="gender"
                defaultValue={initialGender}
                rules={{
                  required: 'indiquez votre civilité',
                }}
                render={({ field }) => (
                  <TextField
                    style={{
                      overflow: 'hidden',
                    }}
                    uuid="gender"
                    name="gender"
                    placeholder="homme ou femme ?"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          Civilité:
                        </InputAdornment>
                      ),
                      inputComponent: () => (
                        <Select
                          {...field}
                          inputRef={field.ref}
                          options={genderOptions}
                          styles={customStyles}
                          defaultOptions
                          maxMenuHeight={200}
                          menuPortalTarget={document.body}
                        />
                      ),
                    }}
                    onChange={(event) => field.onChange(event.target.value)}
                    error={Boolean(errors.gender)}
                    helperText={errors.gender ? errors.gender.message : ''}
                  />
                )}
              />
            </ListItem>
            <ListItem>
              <Controller
                name="lastname"
                control={control}
                defaultValue={data ? data.lastname : ''}
                rules={{
                  required: 'le nom est obligatoire',
                  minLength: {
                    value: 2,
                    message: 'Le nom ne peut pas avoir moins de deux lettres',
                  },
                  maxLength: {
                    value: 20,
                    message: 'le nom ne peut avoir plus de 20 lettres',
                  },
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    uuid="nom"
                    label="Nom"
                    placeholder="Votre nom"
                    error={Boolean(errors.lastname)}
                    helperText={errors.lastname ? errors.lastname.message : ''}
                    {...field}
                  />
                )}
              />
            </ListItem>
            <ListItem>
              <Controller
                name="firstname"
                control={control}
                defaultValue={data ? data.firstname : ''}
                rules={{
                  required: 'le prenom est obligatoire',
                  minLength: {
                    value: 2,
                    message:
                      'Le prénom ne peut pas avoir moins de deux lettres',
                  },
                  maxLength: {
                    value: 20,
                    message: 'le prénom ne peut avoir plus de 20 lettres',
                  },
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    uuid="prenom"
                    label="Prénom"
                    placeholder="Votre prénom"
                    error={Boolean(errors.firstname)}
                    helperText={
                      errors.firstname ? errors.firstname.message : ''
                    }
                    {...field}
                  />
                )}
              />
            </ListItem>
            <ListItem>
              <Controller
                control={control}
                name="phone"
                defaultValue={data ? data.phone : ''}
                rules={{
                  pattern: {
                    value: /^[+](\d{3})\)?(\d{3})(\d{5,6})$|^(\d{10,10})$/,
                    message: "le format de telephone saisi n'est pas valide.",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    uuid="phone"
                    label="Telephone"
                    placeholder="Telephone"
                    error={Boolean(errors.phone)}
                    helperText={errors.phone ? errors.phone.message : ''}
                    {...field}
                  />
                )}
              />
            </ListItem>
          </List>
        )}
        {childrenform && (
          <List>
            <ListItem>
              <Controller
                control={control}
                name="childrenClasses"
                defaultValue={initialClassrooms}
                rules={{
                  required: 'indiquez au moins une classe ',
                }}
                render={({ field }) => (
                  <TextField
                    uuid="gender"
                    name="gender"
                    placeholder="homme ou femme ?"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          Choisir:
                        </InputAdornment>
                      ),
                      inputComponent: () => (
                        <Select
                          {...field}
                          inputRef={field.ref}
                          // options={classroomsOptions}
                          options={classroomList()}
                          isMulti
                          autoFocus
                          styles={customStyles}
                          defaultValue={initialClassrooms}
                          defaultOptions
                          maxMenuHeight={200}
                          menuPortalTarget={document.body}
                        />
                      ),
                    }}
                    onChange={(event) => field.onChange(event.target.value)}
                    error={Boolean(errors.gender)}
                    helperText={errors.gender ? errors.gender.message : ''}
                    // {...field}
                  />
                )}
              />
            </ListItem>
          </List>
        )}
        {passwordform && (
          <List>
            <ListItem>
              <Controller
                name="password"
                defaultValue=""
                control={control}
                rules={{
                  required: "veillez saisir l'ancien mot de pass",
                  maxLength: {
                    value: 64,
                    message:
                      'Le mot de pass ne peut avoir plus de 64 caractères',
                  },
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    uuid="password"
                    label="Ancien mot de pass"
                    placeholder="exemple: FureurVosgienne8854"
                    InputProps={{
                      type: showPassword ? 'text' : 'password',
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    error={Boolean(errors.password)}
                    helperText={errors.password ? errors.password.message : ''}
                    {...field}
                  />
                )}
              />
            </ListItem>

            <ListItem>
              <Controller
                name="newPassword"
                defaultValue=""
                control={control}
                rules={{
                  required: 'veillez saisir le nouveau mot de pass',
                  maxLength: {
                    value: 64,
                    message:
                      'Le mot de pass ne peut avoir plus de 64 caractères',
                  },
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}$/,
                    message:
                      '8 caractères minimum, dont au moins 1 majuscules, 1 majuscule 1 chiffre',
                  },
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    uuid="newPassword"
                    label="Nouveau mot de pass"
                    placeholder="exemple: FureurVosgienne8854"
                    InputProps={{
                      type: showPassword ? 'text' : 'password',
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    error={Boolean(errors.newPassword)}
                    helperText={
                      errors.newPassword ? errors.newPassword.message : ''
                    }
                    {...field}
                  />
                )}
              />
            </ListItem>
            <ListItem>
              <Controller
                name="newPasswordConfirm"
                defaultValue=""
                control={control}
                rules={{
                  required: 'veillez confirmer le nouveau mot de pass',
                  validate: {
                    matches: (value) => {
                      const { newPassword } = getValues()
                      return (
                        newPassword === value ||
                        "la saisie n'est pas identique au nouveau mot de pass"
                      )
                    },
                  },
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    uuid="newPasswordConfirm"
                    label="Confirmer le mot de pass"
                    placeholder="Saisir le nouveau mot de pass"
                    InputProps={{
                      type: showPassword ? 'text' : 'password',
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    error={Boolean(errors.newPasswordConfirm)}
                    helperText={
                      errors.newPasswordConfirm
                        ? errors.newPasswordConfirm.message
                        : ''
                    }
                    {...field}
                  />
                )}
              />
            </ListItem>
          </List>
        )}
        <List>
          <ListItem>
            <Button
              role="button"
              variant="contained"
              fullWidth
              type="submit"
              color="secondary"
              spacing={2}
              disabled={!isValid || isSubmitting}
            >
              je poste mes informations
            </Button>
          </ListItem>
        </List>
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
        uuid: PropTypes.string,
        alias: PropTypes.string,
      })
    ),
  }).isRequired,
}

export default PersoDataForm
