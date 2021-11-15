/* eslint-disable import/named */
import React from 'react'
import PropTypes from 'prop-types'
import { styled } from '@material-ui/styles'
import { List, ListItem, Button, Grid } from '@material-ui/core'
import { useForm } from 'react-hook-form'
import { useSnackbar } from 'notistack'
import { apiPostLosspass } from '../../../../utils/api'
import Title from '../../../elements/Title'
import useMutate from '../../../hooks/useMutate'
import MutateCircularProgress from '../../../elements/MutateCircularProgress'
import getError from '../../../../utils/getError'
import getResponse from '../../../../utils/getResponse'
import TextInput from '../../../elements/inputs/TextInput'
import StyledHookForm from '../../../styled-components/StyledHookForm'

const StyledGrid = styled(Grid)(() => ({
  marginTop: '4rem',
}))

function LosspassEmailForm({ setEmailSent }) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  const formTitle = `Re-Initialisation du mot de pass`
  const queryKey = ['losspass']

  const { mutateAsync, isMutating } = useMutate(queryKey, apiPostLosspass)
  const { control, handleSubmit } = useForm({
    mode: 'onChange',
  })

  const onSubmit = async (datas) => {
    const { email } = datas
    const finalDatas = {
      email,
    }
    closeSnackbar()
    try {
      await mutateAsync({
        action: 'losspass_checkemail',
        body: finalDatas,
      }).then((response) => {
        if (response.status === 200) {
          enqueueSnackbar(getResponse(response), { variant: 'success' })
          setEmailSent(true)
        }
      })
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: 'error' })
    }
  }

  return (
    <StyledGrid container>
      <StyledHookForm onSubmit={handleSubmit(onSubmit)}>
        <Grid item container justify="center" className="form-header">
          <Title title={formTitle} textcolor="whitesmoke" />
        </Grid>
        {isMutating && <MutateCircularProgress />}
        <List className="form-fields-container">
          <ListItem classname="field">
            <TextInput
              control={control}
              name="email"
              defaultValue=""
              label="Indiquez votre adresse mail"
              example="un email correct, au bon format"
              rules={{
                required: 'Indiquez votre email',
                maxLength: {
                  value: 50,
                  message: 'le mail doit avoir au plus 50 caractères',
                },
                pattern: {
                  value: /^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/,
                  message: 'le format mail est incorrect',
                },
              }}
              variant="standard"
            />
          </ListItem>
          <ListItem>
            <Button
              type="submit"
              fullWidth
              color="secondary"
              size="large"
              variant="contained"
            >
              Je recupère mon mot de pass
            </Button>
          </ListItem>
        </List>
      </StyledHookForm>
    </StyledGrid>
  )
}

LosspassEmailForm.propTypes = {
  setEmailSent: PropTypes.func.isRequired,
}

export default LosspassEmailForm
