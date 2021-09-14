/* eslint-disable import/named */
import { yupResolver } from '@hookform/resolvers/yup'
import { Grid, styled } from '@material-ui/core'
import { useTheme } from '@material-ui/styles'
import { useHistory } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'
import InputTextControl from '../components/elements/InputTextControl'
import loginSchema from '../schemas/loginSchema'
import {
  StyledNavLink,
  StyledStandardForm,
} from '../components/elements/styled'
import CostumButton from '../components/elements/CustomButton'
import Title from '../components/elements/Title'
import AlertCollapse from '../components/elements/AlertCollapse'
import { useRouteParams, useUpdateMutationOptions } from '../utils/hooks'
import { apiLogin } from '../utils/api'
import { setUserInfos, setUserToken } from '../redux/user/UserActions'
import { setLoginAlert } from '../redux/alerts/AlertsActions'
import { initialAlertCollapse } from '../constants/alerts'
import returnStoreAndPersistor from '../redux/store'
import tokenDatas from '../utils/tokenDatas'

const StyledGrid = styled(Grid)(() => ({
  marginTop: '4rem',
}))
function LoginScreen() {
  const history = useHistory()
  const message = useRouteParams('message')
  const status = useRouteParams('status')
  const { persistor } = returnStoreAndPersistor()
  const { login: loginAlert } = useSelector((state) => state.alerts)
  const dispatch = useDispatch()
  const theme = useTheme()
  const [topAlert, setTopAlert] = useState({
    severity: 'error',
    alertText: '',
    openAlert: false,
  })
  const { User } = useSelector((state) => state.user)
  const [mutationResponse, setMutationResponse] = useState(null)
  const formTitle = `Connexion à lécole`

  const { mutateAsync } = useMutation(
    apiLogin,
    useUpdateMutationOptions(['login'])
  )
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(loginSchema),
  })

  const onSubmit = async (datas) => {
    try {
      await mutateAsync(datas).then((response) => {
        // setMutationResponse(response)
        if (response.status === 200) {
          const { newToken, newDatas } = tokenDatas(response)

          dispatch(setUserInfos(newDatas))
          dispatch(setUserToken(newToken))
          const { isAdmin, isVerified } = newDatas
          if (isAdmin) {
            history.push('/informations')
          } else {
            history.push('/')
          }
        }
      })
    } catch (err) {
      setTopAlert({
        severity: 'error',
        alertText: err.response.data.message,
        openAlert: true,
      })
      window.scrollTo(0, 0)
    }
  }

  // useEffect(() => {
  //   if (mutationResponse && mutationResponse.status === 200) {
  //     const { newToken, newDatas } = tokenDatas(mutationResponse)
  //     dispatch(setUserInfos(newDatas))
  //     dispatch(setUserToken(newToken))
  //     const { isAdmin, isVerified } = newDatas
  //     if (isAdmin) {
  //       history.push('/informations')
  //     } else {
  //       history.push('/')
  //     }
  //   }
  // }, [mutationResponse, dispatch])
  // useEffect(() => {
  //   if (!User) {
  //     history.push('/login')
  //   }
  // }, [User])

  useEffect(() => {
    if (status && message) {
      setTopAlert({
        severity: status,
        alertText: message,
        openAlert: true,
      })
    }
    return () => {
      setTopAlert({
        severity: 'error',
        alertText: '',
        openAlert: false,
      })
    }
  }, [])

  return (
    <StyledGrid container>
      <Grid item container>
        <AlertCollapse
          {...loginAlert}
          callback={() => dispatch(setLoginAlert(initialAlertCollapse))}
        />
        <AlertCollapse
          alertText={topAlert.alertText}
          openAlert={topAlert.openAlert}
          severity={topAlert.severity}
          callback={setTopAlert}
        />
      </Grid>

      <StyledStandardForm onSubmit={handleSubmit(onSubmit)}>
        <Grid item container justify="center" className="form-header">
          <Title title={formTitle} textcolor="whitesmoke" />
        </Grid>
        <Grid container className="form-body">
          <InputTextControl
            name="email"
            type="email"
            label="Email"
            // placeholder="geremy@gmail.com"
            helperText="au moins 10 caractères"
            width="100%"
            control={control}
          />
          <InputTextControl
            name="password"
            type="password"
            label="Mot de Pass"
            placeholder="FureurVosgienne8854"
            helperText="8 caractères minimum, dont au moins 1 majuscules, une majuscule 1 chiffre"
            width="100%"
            control={control}
          />
        </Grid>
        <Grid
          item
          container
          alignItems="center"
          justify="center"
          className="form-footer"
        >
          <Grid
            item
            container
            justify="center"
            alignItems="center"
            className="form-footer-button"
          >
            <CostumButton
              text="Je me connecte"
              bgcolor={theme.palette.success.main}
              action="post"
              width="21rem"
              type="submit"
              disabled={!isValid || isSubmitting}
            />
          </Grid>
          <Grid
            item
            container
            className="form-footer-mentions"
            direction="column"
            justify="space-between"
            alignItems="center"
          >
            <StyledNavLink to="/private/identification/register">
              {' '}
              Pas de compte ? Incrivez vous
            </StyledNavLink>
            <StyledNavLink to="/private/identification/losspass/:token">
              {' '}
              Pass perdu ? Réinitialiser
            </StyledNavLink>
          </Grid>
        </Grid>
      </StyledStandardForm>
    </StyledGrid>
  )
}

export default LoginScreen
