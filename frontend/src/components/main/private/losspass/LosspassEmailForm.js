/* eslint-disable import/named */
import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import PropTypes from 'prop-types'
import { styled, useTheme } from '@material-ui/styles'
import { Grid } from '@material-ui/core'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { useDispatch } from 'react-redux'
import { apiPostLosspass } from '../../../../utils/api'
import { useUpdateMutationOptions } from '../../../../utils/hooks'
import { lossPassEmailSchema } from '../../../../schemas/losspassSchema'
import { StyledStandardForm } from '../../../elements/styled'
import Title from '../../../elements/Title'
import InputTextControl from '../../../elements/InputTextControl'
import CustomButton from '../../../elements/CustomButton'
import { setMutateAlert } from '../../../../redux/alerts/AlertsActions'
import {
  errorAlertCollapse,
  successAlertCollapse,
} from '../../../../constants/alerts'

const StyledGrid = styled(Grid)(() => ({
  marginTop: '4rem',
}))

function LosspassEmailForm({ setEmailSent }) {
  const theme = useTheme()
  const dispatch = useDispatch()
  const formTitle = `Re-Initialisation du mot de pass`

  const { mutateAsync } = useMutation(
    apiPostLosspass,
    useUpdateMutationOptions(['losspass'])
  )
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
    try {
      await mutateAsync({
        action: 'losspass_checkemail',
        body: finalDatas,
      }).then((response) => {
        if (response.status === 200) {
          dispatch(setMutateAlert(successAlertCollapse(response.data.message)))
          setEmailSent(true)
        }
      })
    } catch (err) {
      dispatch(setMutateAlert(errorAlertCollapse(err.response.data.message)))
    }
  }

  return (
    <StyledGrid container>
      <StyledStandardForm onSubmit={handleSubmit(onSubmit)}>
        <Grid item container justify="center" className="form-header">
          <Title title={formTitle} textcolor="whitesmoke" />
        </Grid>
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
