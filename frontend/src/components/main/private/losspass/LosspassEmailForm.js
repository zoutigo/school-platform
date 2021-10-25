/* eslint-disable import/named */
import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import PropTypes from 'prop-types'
import { styled, useTheme } from '@material-ui/styles'
import { Grid } from '@material-ui/core'
import { useForm } from 'react-hook-form'
import { useSnackbar } from 'notistack'
import { apiPostLosspass } from '../../../../utils/api'
import { lossPassEmailSchema } from '../../../../schemas/losspassSchema'
import { StyledStandardForm } from '../../../elements/styled'
import Title from '../../../elements/Title'
import InputTextControl from '../../../elements/InputTextControl'
import CustomButton from '../../../elements/CustomButton'
import useMutate from '../../../hooks/useMutate'
import MutateCircularProgress from '../../../elements/MutateCircularProgress'
import getError from '../../../../utils/getError'
import getResponse from '../../../../utils/getResponse'

const StyledGrid = styled(Grid)(() => ({
  marginTop: '4rem',
}))

function LosspassEmailForm({ setEmailSent }) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const theme = useTheme()

  const formTitle = `Re-Initialisation du mot de pass`
  const queryKey = ['losspass']

  const { mutateAsync, isMutating } = useMutate(queryKey, apiPostLosspass)
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(lossPassEmailSchema),
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
          enqueueSnackbar(response.data.message, { variant: 'success' })
          setEmailSent(true)
        }
      })
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: 'error' })
    }
  }

  return (
    <StyledGrid container>
      <StyledStandardForm onSubmit={handleSubmit(onSubmit)}>
        <Grid item container justify="center" className="form-header">
          <Title title={formTitle} textcolor="whitesmoke" />
        </Grid>
        {isMutating && <MutateCircularProgress />}
        <Grid container className="form-body">
          <InputTextControl
            name="email"
            type="email"
            label="Indiquez votre adresse mail"
            // placeholder="geremy@gmail.com"
            helperText="un email correct, au bon format"
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
            <CustomButton
              text="Je m'inscris"
              bgcolor={theme.palette.success.main}
              action="post"
              width="21rem"
              type="submit"
              disabled={!isValid || isSubmitting}
            />
          </Grid>
        </Grid>
      </StyledStandardForm>
    </StyledGrid>
  )
}

LosspassEmailForm.propTypes = {
  setEmailSent: PropTypes.func.isRequired,
}

export default LosspassEmailForm
