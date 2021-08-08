/* eslint-disable import/named */
import React from 'react'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { styled, useTheme } from '@material-ui/styles'
import { Grid } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { useMutation } from 'react-query'
import { apiPostLosspass } from '../../../../utils/api'
import { useUpdateMutationOptions } from '../../../../utils/hooks'
import { lossPassPasswordSchema } from '../../../../schemas/losspassSchema'
import {
  errorAlertCollapse,
  successAlertCollapse,
} from '../../../../constants/alerts'
import { setMutateAlert } from '../../../../redux/alerts/AlertsActions'
import CustomButton from '../../../elements/CustomButton'
import { StyledStandardForm } from '../../../elements/styled'
import Title from '../../../elements/Title'
import InputTextControl from '../../../elements/InputTextControl'

const StyledGrid = styled(Grid)(() => ({
  marginTop: '4rem',
}))

function LosspassPasswordForm({ setPasswordSent, token }) {
  const theme = useTheme()
  const dispatch = useDispatch()
  const formTitle = `2/2: Re-Initialisation du mot de pass`

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
    resolver: yupResolver(lossPassPasswordSchema),
  })

  const onSubmit = async (datas) => {
    const { password, passwordConfirm } = datas
    const finalDatas = {
      password,
      passwordConfirm,
      token: token,
    }
    try {
      await mutateAsync({
        action: 'losspass_updatepass',
        body: finalDatas,
      }).then((response) => {
        if (response.status === 200) {
          dispatch(setMutateAlert(successAlertCollapse(response.data.message)))
          setPasswordSent(true)
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
            name="password"
            type="password"
            label="Le nouveau Mot de Pass"
            placeholder="FureurVosgienne8854"
            helperText="8 caractères minimum, dont au moins 1 majuscules, 1 majuscule 1 chiffre"
            width="100%"
            control={control}
          />
          <InputTextControl
            name="passwordConfirm"
            type="password"
            label="Confirmer ce nouveau Mot de pass"
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

LosspassPasswordForm.propTypes = {
  setPasswordSent: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
}
export default LosspassPasswordForm
