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
import { useRouteParams } from '../utils/hooks'
import LazyMessage from '../components/elements/LazyMessage'
import StyledForm from '../components/styled-components/StyledForm'
import StyledNavLink from '../components/styled-components/StyledNavLink'
import getError from '../utils/error'
import useRegister from '../components/hooks/useRegister'

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

  const { mutateAsync } = useRegister()

  const onSubmit = async (datas) => {
    closeSnackbar()
    try {
      await mutateAsync(datas).then((response) => {
        if (response.status === 201) {
          setValue('email', '')
          setValue('password', '')
          setValue('passwordConfirm', '')
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
          <List>
            <ListItem>
              <Controller
                name="email"
                defaultValue=""
                control={control}
                rules={{
                  required: true,
                  pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/,
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="email"
                    label="Email"
                    placeholder="Entrez votre email"
                    inputProps={{ type: 'email' }}
                    FormHelperTextProps={{
                      'data-testid': 'password-error',
                    }}
                    error={Boolean(errors.email)}
                    helperText={errors.email ? getEmailError(errors.email) : ''}
                    {...field}
                  />
                )}
              />
            </ListItem>
            <ListItem>
              <Controller
                name="password"
                defaultValue=""
                control={control}
                rules={{
                  required: true,
                  minLength: 8,
                  pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}$/,
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="password"
                    placeholder="Entrez votre mot de pass"
                    label="Mot de Pass"
                    inputProps={{ type: 'password' }}
                    error={Boolean(errors.password)}
                    helperText={
                      errors.password ? getPasswordError(errors.password) : ''
                    }
                    {...field}
                  />
                )}
              />
            </ListItem>
            <ListItem>
              <Controller
                name="passwordConfirm"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  validate: {
                    matches: (value) => {
                      const { password } = getValues()
                      return password === value
                    },
                  },
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="passwordConfirm"
                    placeholder="Confirmez le mot de pass"
                    label="Confirmation mot de pass"
                    inputProps={{ type: 'password' }}
                    error={Boolean(errors.passwordConfirm)}
                    helperText={
                      errors.passwordConfirm
                        ? getPasswordConfirmError(errors.passwordConfirm)
                        : ''
                    }
                    {...field}
                  />
                )}
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
