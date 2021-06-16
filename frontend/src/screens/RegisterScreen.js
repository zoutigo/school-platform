import { yupResolver } from '@hookform/resolvers/yup'
import { Grid, styled } from '@material-ui/core'
import { useTheme } from '@material-ui/styles'
import { useHistory } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { useDispatch } from 'react-redux'
import InputTextControl from '../components/elements/InputTextControl'
import {
  StyledNavLink,
  StyledStandardForm,
} from '../components/elements/styled'
import CostumButton from '../components/elements/CustomButton'
import Title from '../components/elements/Title'
import AlertCollapse from '../components/elements/AlertCollapse'
import { useUpdateMutationOptions } from '../utils/hooks'
import { apiRegister } from '../utils/api'
import registerSchema from '../schemas/registerSchema'
import { setUserInfos, setUserToken } from '../redux/user/UserActions'

const StyledGrid = styled(Grid)(() => ({
  marginTop: '4rem',
}))

function RegisterScreen() {
  const history = useHistory()
  const theme = useTheme()
  const dispatch = useDispatch()
  const [topAlert, setTopAlert] = useState({
    severity: 'error',
    alertText: '',
    openAlert: false,
  })
  const formTitle = `Inscription à lécole`

  const { mutateAsync } = useMutation(
    apiRegister,
    useUpdateMutationOptions(['register'])
  )
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(registerSchema),
  })

  const onSubmit = async (datas) => {
    try {
      await mutateAsync(datas).then((response) => {
        if (response.status === 201) {
          const Token = response.headers['x-access-token']
          const splittedToken = Token.split('.')
          const tokenDatas = JSON.parse(atob(splittedToken[1]))
          dispatch(setUserInfos(tokenDatas))
          dispatch(setUserToken(Token))
          history.push('/private/account')
        }
      })
    } catch (err) {
      setTopAlert({
        severity: 'error',
        alertText: err.message,
        openAlert: true,
      })
      window.scrollTo(0, 0)
    }
  }

  useEffect(
    () =>
      setTopAlert({
        severity: 'error',
        alertText: '',
        openAlert: false,
      }),

    []
  )

  return (
    <StyledGrid container>
      {topAlert.openAlert && (
        <Grid item container>
          <AlertCollapse
            alertText={topAlert.alertText}
            openAlert
            severity={topAlert.severity}
            callback={setTopAlert}
          />
        </Grid>
      )}
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
            helperText="un email correct, au bon format"
            width="100%"
            control={control}
          />
          <InputTextControl
            name="password"
            type="password"
            label="Mot de Pass"
            placeholder="FureurVosgienne8854"
            helperText="8 caractères minimum, dont au moins 1 majuscules, 1 majuscule 1 chiffre"
            width="100%"
            control={control}
          />
          <InputTextControl
            name="passwordConfirm"
            type="password"
            label="Confirmation Pass"
            placeholder="FureurVosgienne8854"
            helperText="Identique au mot de pass du dessus"
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
              text="Je m'inscris"
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
            <StyledNavLink to="/register">
              {' '}
              Pas de compte ? Incrivez vous
            </StyledNavLink>
            <StyledNavLink to="/register">
              {' '}
              Pass perdu ? Réinitialiser
            </StyledNavLink>
          </Grid>
        </Grid>
      </StyledStandardForm>
    </StyledGrid>
  )
}

export default RegisterScreen
