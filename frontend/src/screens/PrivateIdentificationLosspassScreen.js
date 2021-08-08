import { Grid } from '@material-ui/core'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useHistory, useParams } from 'react-router-dom'
import AlertCollapse from '../components/elements/AlertCollapse'
import LazyMessage from '../components/elements/LazyMessage'
import LosspassEmailForm from '../components/main/private/losspass/LosspassEmailForm'
import LosspassPasswordForm from '../components/main/private/losspass/LosspassPasswordForm'
import { initialAlertCollapse } from '../constants/alerts'
import { setMutateAlert } from '../redux/alerts/AlertsActions'

function PrivateIdentificationLosspassScreen() {
  const dispatch = useDispatch()
  const history = useHistory()
  const { token } = useParams()
  const [externalToken, setExternalToken] = useState(token)
  const [emailSent, setEmailSent] = useState(false)
  const [passwordSent, setPasswordSent] = useState(false)
  const { mutate } = useSelector((state) => state.alerts)

  const nullToken = useCallback(token === ':token', [token])

  const callback = useCallback(() => {
    dispatch(setMutateAlert(initialAlertCollapse))
  }, [])

  useEffect(() => {
    if (passwordSent) {
      setTimeout(history.push('/private/identification/login'), 3000)
    }
    return () => {
      callback()
      setEmailSent(false)
    }
  }, [passwordSent])

  const EmailSentMessage = useCallback(
    () => (
      <div style={{ width: '90%' }}>
        <p style={{ color: 'green', fontWeight: 'bold' }}>
          Nous avons bien pris en compte votre demande de re initialisation du
          mot de pass. <br />
        </p>
        <p>
          Un mail vous été envoyé dans votre boite mail afin de procéder à la
          modification.
        </p>
        <p style={{ color: 'red', fontWeight: 'bold' }}>
          Valable une heure uniquement.
          <br />
          <strong>Pensez à vérifier dans le dossiers des spams</strong>
        </p>
      </div>
    ),
    []
  )

  return (
    <Grid container>
      <AlertCollapse {...mutate} callback={callback} />
      {nullToken && !emailSent && (
        <LosspassEmailForm setEmailSent={setEmailSent} />
      )}
      {!nullToken && !passwordSent && !emailSent && (
        <LosspassPasswordForm setPasswordSent={setPasswordSent} token={token} />
      )}
      {emailSent && (
        <LazyMessage severity="info">
          <EmailSentMessage />
        </LazyMessage>
      )}
    </Grid>
  )
}

export default PrivateIdentificationLosspassScreen
