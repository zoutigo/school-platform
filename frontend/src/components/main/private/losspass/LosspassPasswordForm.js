/* eslint-disable import/named */
import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { styled } from '@material-ui/styles'
import { Grid, List, ListItem, Button } from '@material-ui/core'
import { useSnackbar } from 'notistack'
import { apiPostLosspass } from '../../../../utils/api'
import Title from '../../../elements/Title'
import useMutate from '../../../hooks/useMutate'
import MutateCircularProgress from '../../../elements/MutateCircularProgress'
import getError from '../../../../utils/getError'
import getResponse from '../../../../utils/getResponse'
import StyledHookForm from '../../../styled-components/StyledHookForm'
import TextInput from '../../../elements/inputs/TextInput'

const StyledGrid = styled(Grid)(() => ({
  marginTop: '4rem',
}))

function LosspassPasswordForm({ setPasswordSent, token, setEmailSent }) {
  const history = useHistory()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  const formTitle = `2/2: Re-Initialisation du mot de pass`
  const queryKey = ['losspass']

  const { mutateAsync, isMutating } = useMutate(queryKey, apiPostLosspass)

  const {
    control,
    handleSubmit,
    getValues,
    formState: { isSubmitting },
  } = useForm({
    mode: 'onChange',
  })

  const onSubmit = async (datas) => {
    const { password, passwordConfirm } = datas
    const finalDatas = {
      password,
      passwordConfirm,
      token: token,
    }
    closeSnackbar()
    try {
      await mutateAsync({
        action: 'losspass_updatepass',
        body: finalDatas,
      }).then((response) => {
        if (response.status === 200) {
          enqueueSnackbar(getResponse(response), { variant: 'success' })
          setPasswordSent(true)
        }
      })
    } catch (err) {
      if (err.response.status === 498) {
        enqueueSnackbar(
          'Le jeton de recuperation est arrivé à expiration. Recommencez la procédure de récupération',
          { variant: 'error' }
        )
      } else {
        enqueueSnackbar(getError(err), { variant: 'error' })
      }
      setEmailSent(false)
      history.push('/private/identification/losspass/:token')
    }
  }

  return (
    <StyledGrid container>
      {isMutating && <MutateCircularProgress />}
      <StyledHookForm onSubmit={handleSubmit(onSubmit)}>
        <Grid item container justify="center" className="form-header">
          <Title title={formTitle} textcolor="whitesmoke" />
        </Grid>

        <List className="form-fields-container">
          <ListItem className="field">
            <TextInput
              control={control}
              name="password"
              defaultValue=""
              label="Le nouveau Mot de Pass"
              example="FureurVosgienne8854"
              variant="standard"
              rules={{
                required: 'veillez saisir le nouveau mot de pass',
                maxLength: {
                  value: 64,
                  message: 'Le mot de pass ne peut avoir plus de 64 caractères',
                },
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}$/,
                  message:
                    '8 caractères minimum, dont au moins 1 majuscules, 1 majuscule 1 chiffre',
                },
              }}
            />
          </ListItem>
          <ListItem className="field">
            <TextInput
              control={control}
              name="passwordConfirm"
              defaultValue=""
              label="Confirmer ce nouveau Mot de pass"
              example="Doit etre identique au précédent"
              variant="standard"
              rules={{
                required: 'veillez confirmer le nouveau mot de pass',
                validate: {
                  matches: (value) => {
                    const { password } = getValues()
                    return (
                      password === value ||
                      "la saisie n'est pas identique au nouveau mot de pass"
                    )
                  },
                },
              }}
            />
          </ListItem>
          <ListItem>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              size="large"
              disabled={isSubmitting}
            >
              Je modifie mon mot de pass
            </Button>
          </ListItem>
        </List>
      </StyledHookForm>
    </StyledGrid>
  )
}

LosspassPasswordForm.propTypes = {
  setPasswordSent: PropTypes.func.isRequired,
  setEmailSent: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
}
export default LosspassPasswordForm
