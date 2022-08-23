/* eslint-disable no-nested-ternary */
/* eslint-disable import/named */
import { yupResolver } from '@hookform/resolvers/yup'
import {
  Grid,
  List,
  ListItem,
  TextField,
  Typography,
  Button,
} from '@material-ui/core'
import { styled } from '@material-ui/styles'
import { useHistory } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import * as yup from 'yup'

import StyledForm from '../components/styled-components/StyledForm'
// import AlertCollapse from '../components/elements/AlertCollapse'

import { setUserInfos, setUserToken } from '../redux/user/UserActions'
import getResponse from '../utils/getResponse'
import tokenDatas from '../utils/tokenDatas'
import getError from '../utils/getError'
import {
  emailPattern,
  passwordPattern,
  passwordRegex,
} from '../constants/regex'
import StyledNavLink from '../components/styled-components/StyledNavLink'
import useRouteParams from '../components/hooks/useRouteParams'
import useMutate from '../components/hooks/useMutate'
import MutateCircularProgress from '../components/elements/MutateCircularProgress'
import { apiLogin } from '../utils/api'
import InputTextControlNew from '../components/elements/InputTextControlNew'

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required('le mail est obligatoire')
    .email(`ce format mail n'est pas valide`),

  password: yup
    .string()
    .required('le mot de pass est obligatoire')
    .matches(passwordRegex, 'Mot de pass non valide'),
})

const StyledGrid = styled(Grid)(() => ({
  marginTop: '4rem',
}))
function LoginScreen() {
  const history = useHistory()
  const message = useRouteParams('message')
  const status = useRouteParams('status')
  const queryKey = ['login']
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const dispatch = useDispatch()

  const { mutateAsync, isMutating } = useMutate(queryKey, apiLogin)

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid, errors },
  } = useForm({
    mode: 'onChange',
    // resolver: yupResolver(loginSchema),
  })

  const onSubmit = async (datas) => {
    const finalDatas = {
      username: datas.email,
      password: datas.password,
    }
    closeSnackbar()
    try {
      await mutateAsync(finalDatas).then((response) => {
        if (response && response.status === 200) {
          const { newToken, newDatas } = tokenDatas(response)
          dispatch(setUserInfos(newDatas))
          dispatch(setUserToken(newToken))

          enqueueSnackbar(getResponse(response), { variant: 'success' })

          const { isAdmin } = newDatas
          setTimeout(
            () => history.push(isAdmin ? '/informations/actualites' : '/'),
            2000
          )
        }
      })
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: 'error' })
      window.scrollTo(0, 0)
    }
  }

  const buttonText = `Je me connecte`

  return (
    <StyledGrid container data-testid="login-screen">
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <Typography component="h2" variant="h2">
          Login
        </Typography>
        {isMutating && <MutateCircularProgress />}
        <List>
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
          {/* <ListItem>
            <Controller
              name="email"
              control={control}
              defaultValue=""
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
                  error={Boolean(errors.email)}
                  helperText={errors.email ? errors.email.message : null}
                  {...field}
                />
              )}
            />
          </ListItem> */}
          {/* <ListItem>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 8,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="password"
                  placeholder="Entrez votre password"
                  label="Mot de Pass"
                  inputProps={{ type: 'password' }}
                  error={Boolean(errors.password)}
                  helperText={errors.password ? errors.password.message : null}
                  {...field}
                />
              )}
            />
          </ListItem> */}
          <ListItem>
            <Button
              role="button"
              variant="contained"
              type="submit"
              fullWidth
              color="primary"
              disabled={!isValid || isSubmitting}
            >
              {buttonText}
            </Button>
          </ListItem>
          <ListItem>
            Pas de compte ? &nbsp;
            <StyledNavLink
              to="/private/identification/register"
              className="nav-link"
            >
              <span>Enregistrez vous</span>
            </StyledNavLink>
          </ListItem>
          <ListItem>
            Pass perdu ? &nbsp;
            <StyledNavLink
              to="/private/identification/losspass/:token"
              className="nav-link"
            >
              <span>Réinitialiser </span>
            </StyledNavLink>
          </ListItem>
        </List>
      </StyledForm>
    </StyledGrid>
  )
}

export default LoginScreen
