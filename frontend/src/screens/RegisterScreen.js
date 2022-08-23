import {
  Grid,
  styled,
  Typography,
  List,
  ListItem,
  TextField,
  Button,
} from '@material-ui/core'

import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useSnackbar } from 'notistack'
import LazyMessage from '../components/elements/LazyMessage'
import StyledForm from '../components/styled-components/StyledForm'
import StyledNavLink from '../components/styled-components/StyledNavLink'
import getError from '../utils/getError'
import useRouteParams from '../components/hooks/useRouteParams'
import useMutate from '../components/hooks/useMutate'
import MutateCircularProgress from '../components/elements/MutateCircularProgress'
import { apiRegister } from '../utils/api'
import InputTextControlNew from '../components/elements/InputTextControlNew'
import { emailPattern, passwordPattern } from '../constants/regex'

const StyledGrid = styled(Grid)(() => ({
  marginTop: '4rem',
}))

const getEmailError = (error) => {
  switch (error.type) {
    case 'required':
      return 'le mail est obligatoire'
    case 'pattern':
      return `ce format mail n'est pas valide`
    default:
      return ''
  }
}
const getPasswordError = (error) => {
  switch (error.type) {
    case 'required':
      return 'le mot de pass est obligatoire'
    case 'minLength':
      return 'le mot de pass doit avoir au moins 8 caractères'
    case 'pattern':
      return `mot de pass invalide: 8 caractères au minimum dont 1 majuscule, 1 minuscule , 1 chiffre`
    default:
      return ''
  }
}
const getPasswordConfirmError = (error) => {
  switch (error.type) {
    case 'required':
      return 'la confirmation du mot de pass est obligatoire'
    case 'matches':
      return 'les deux mots de pass doivent etre identiques'
    default:
      return ''
  }
}

const SuccessMessage = () => (
  <Grid item container data-testid="register-success-message">
    <Typography variant="h2" color="secondary">
      Votre incription au site est correctement effectuée.
    </Typography>
    <Typography variant="body1">
      Un mail vous été adressé afin de valdider votre inscription.
    </Typography>
    <Typography variant="body1">
      Vous pourrez alors consulter les contenus strictement reservés aux parents
    </Typography>
  </Grid>
)

function RegisterScreen() {
  const message = useRouteParams('message')
  const status = useRouteParams('status')
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const queryKey = ['register']
  const [showForm, setshowForm] = useState(true)
  const formTitle = `Inscription au site de l'école`
  const submitButtonText = `Je m'inscris`

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid, errors },
    getValues,
    setValue,
  } = useForm({
    mode: 'onChange',
  })
  const { mutateAsync, isMutating } = useMutate(queryKey, apiRegister)

  const onSubmit = async (datas) => {
    const { email, password, passwordConfirm, lastname, firstname } = datas
    const finalDatas = { email, password, passwordConfirm, lastname, firstname }
    closeSnackbar()
    try {
      await mutateAsync(finalDatas).then((response) => {
        if (response.status === 201) {
          setValue('email', '')
          setValue('password', '')
          setValue('passwordConfirm', '')
          setValue('lastname', '')
          setValue('firstname', '')
          setshowForm(false)
        }
      })
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: 'error' })
      window.scrollTo(0, 0)
    }
  }

  useEffect(() => {
    closeSnackbar()
    if (status && message) {
      enqueueSnackbar(message, { variant: status })
    }
  }, [status, message, enqueueSnackbar, closeSnackbar])

  return (
    <StyledGrid container role="presentation">
      {showForm ? (
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <Typography component="h2" variant="h2">
            {formTitle}
          </Typography>
          {isMutating && <MutateCircularProgress />}
          <List>
            <ListItem>
              <InputTextControlNew
                control={control}
                name="firstname"
                label="Prénom "
                defaultValue=""
                variant="outlined"
                example=""
                rules={{
                  required: 'le prénom est obligatoire',
                  minLength: {
                    value: 2,
                    message: 'le prénom doit avoir 2 caractères au moins',
                  },
                  maxLength: {
                    value: 30,
                    message: 'le prénom doit avoir 30 caractères au plus',
                  },
                }}
              />
            </ListItem>
            <ListItem>
              <InputTextControlNew
                control={control}
                name="lastname"
                label="Nom "
                defaultValue=""
                variant="outlined"
                example=""
                rules={{
                  required: 'le nom est obligatoire',
                  minLength: {
                    value: 2,
                    message: 'le nom doit avoir 2 caractères au moins',
                  },
                  maxLength: {
                    value: 30,
                    message: 'le nom doit avoir 30 caractères au plus',
                  },
                }}
              />
            </ListItem>
            <ListItem>
              <InputTextControlNew
                control={control}
                name="email"
                label="Email "
                defaultValue=""
                variant="outlined"
                example="bienvenu@example.com"
                rules={{
                  required: 'le mail est obligatoire',
                  pattern: {
                    value: emailPattern,
                    message: `Ceci n'est pas une adresse mail correcte`,
                  },
                  maxLength: {
                    value: 100,
                    message: 'le mail doit avoir 30 caractères au plus',
                  },
                }}
              />
            </ListItem>
            <ListItem>
              <InputTextControlNew
                control={control}
                name="password"
                label="Mot de pass "
                defaultValue=""
                variant="outlined"
                example="Karamba1728"
                rules={{
                  required: 'le mot de pass est obligatoire',
                  pattern: {
                    value: passwordPattern,
                    message: `mot de pass invalide: 8 caractères au minimum dont 1 majuscule, 1 minuscule , 1 chiffre`,
                  },
                  maxLength: {
                    value: 30,
                    message: 'le mot de pass doit avoir 30 caractères au plus',
                  },
                }}
              />
            </ListItem>
            <ListItem>
              <InputTextControlNew
                control={control}
                name="passwordConfirm"
                label="Confirmation mot de pass"
                defaultValue=""
                variant="outlined"
                example=""
                rules={{
                  required: 'la confirmation est obligatoire',
                  validate: {
                    matches: (value) => {
                      const { password } = getValues()
                      return (
                        password === value ||
                        'les mots de pass ne sont pas identiques'
                      )
                    },
                  },
                }}
              />
            </ListItem>

            <ListItem>
              <Button
                role="button"
                variant="contained"
                type="submit"
                fullWidth
                color="primary"
                disabled={!isValid || isSubmitting}
              >
                {submitButtonText}
              </Button>
            </ListItem>
            <ListItem>
              Dejà inscrit ? &nbsp;
              <StyledNavLink
                to="/private/identification/login"
                className="nav-link"
              >
                <span>Connectez vous</span>
              </StyledNavLink>
            </ListItem>
          </List>
        </StyledForm>
      ) : (
        <LazyMessage severity="success">
          <SuccessMessage />
        </LazyMessage>
      )}
    </StyledGrid>
  )
}

export default RegisterScreen
