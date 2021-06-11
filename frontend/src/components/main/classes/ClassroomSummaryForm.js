import { Grid, styled, useTheme } from '@material-ui/core'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import PropTypes from 'prop-types'
import { useMutation } from 'react-query'
import { apiUpdateClassroom } from '../../../utils/api'
import { useUpdateMutationOptions } from '../../../utils/hooks'
import classroomSummarySchema from '../../../schemas/classroomSummarySchema'
import TinyTextEditor from '../../elements/TinyTextEditor'
import { StyledForm } from '../../elements/styled'
import CustomButton from '../../elements/CustomButton'
import AlertCollapse from '../../elements/AlertCollapse'
import Title from '../../elements/Title'

const StyledEditorForm = styled(StyledForm)(() => ({
  width: '100% !important',
}))

function ClassroomSummaryForm({
  classroomId,
  classroomAlias,
  setShowSummaryForm,
  setShowSummary,
  setShowButtonGroup,
  setShowAlert,
  setAlertMessage,
  classroomSummary,
}) {
  const theme = useTheme()
  const token = useSelector((state) => state.user.Token.token)
  const [showApiFailureAlert, setShowApiFailureAlert] = useState(false)
  const [apiFailureMessage, setApiFailureMessage] = useState('')

  const queryName = `classroom-${classroomAlias}`
  const queryKey = [queryName, classroomId]
  const { mutateAsync, isSuccess: isMutationSuccess } = useMutation(
    apiUpdateClassroom,
    useUpdateMutationOptions(queryKey)
  )

  const {
    control,
    setValue,
    handleSubmit,
    formState: { isValid, isSubmitting, errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(classroomSummarySchema),
  })

  const onSubmit = async (datas) => {
    const { summary } = datas
    const options = {
      headers: { 'x-access-token': token || 'hello' },
    }
    try {
      await mutateAsync({
        id: classroomId,
        options: options,
        body: {
          summary: summary,
        },
      })
    } catch (err) {
      setShowApiFailureAlert(true)
      setApiFailureMessage(err.message)
    }
  }

  // close the form
  React.useEffect(() => {
    if (isMutationSuccess) {
      setAlertMessage('Le résumé a bien été modifié')
      setShowAlert(true)
      setShowSummaryForm(false)
      setShowButtonGroup(true)
      setShowSummary(true)
    }
  }, [isMutationSuccess])

  // injection of the initial value in the editor
  React.useEffect(() => {
    setValue('summary', classroomSummary)
    return () => {
      setValue('summary', '')
    }
  }, [])

  return (
    <Grid item container>
      <Grid item container>
        <CustomButton
          action="back"
          text=""
          width="50px"
          type="button"
          bgcolor={theme.palette.warning.main}
          disabled={isSubmitting}
          onClick={() => {
            setShowSummaryForm(false)
            setShowButtonGroup(true)
            setShowSummary(true)
          }}
        />
      </Grid>
      <Grid item container justify="center">
        <StyledEditorForm onSubmit={handleSubmit(onSubmit)}>
          <Grid container>
            <Grid item container>
              <Grid item>
                {' '}
                <Title title="mofification de la page" />{' '}
              </Grid>
            </Grid>
            <Grid item container>
              <Controller
                name="summary"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value } }) => (
                  <TinyTextEditor onChange={onChange} value={value} />
                )}
              />
            </Grid>
            <Grid item container>
              <AlertCollapse
                openAlert={showApiFailureAlert}
                alertText={apiFailureMessage}
              />
              <AlertCollapse
                openAlert={errors.summary}
                alertText={errors.image ? errors.image.message : ''}
              />
            </Grid>
            <Grid item container justify="center">
              <CustomButton
                action="post"
                text="je publie le resumé"
                type="submit"
                width="100%"
                bgcolor={theme.palette.success.main}
                disabled={!isValid || isSubmitting}
              />
            </Grid>
          </Grid>
        </StyledEditorForm>
      </Grid>
    </Grid>
  )
}

ClassroomSummaryForm.propTypes = {
  classroomId: PropTypes.string.isRequired,
  classroomSummary: PropTypes.string.isRequired,
  classroomAlias: PropTypes.string.isRequired,
  setShowSummary: PropTypes.func.isRequired,
  setShowSummaryForm: PropTypes.func.isRequired,
  setShowButtonGroup: PropTypes.func.isRequired,
  setShowAlert: PropTypes.func.isRequired,
  setAlertMessage: PropTypes.func.isRequired,
}

export default ClassroomSummaryForm
