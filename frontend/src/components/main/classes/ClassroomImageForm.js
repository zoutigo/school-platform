import { yupResolver } from '@hookform/resolvers/yup'
import { Grid, useTheme } from '@material-ui/core'

import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Resizer from 'react-image-file-resizer'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { useSelector } from 'react-redux'
import { StyledForm } from '../../elements/styled'
import { apiUpdateClassroom } from '../../../utils/api'
import { useUpdateMutationOptions } from '../../../utils/hooks'
import classroomImageSchema from '../../../schemas/classroomImageSchema'
import AlertCollapse from '../../elements/AlertCollapse'
import CustomButton from '../../elements/CustomButton'
import Title from '../../elements/Title'

const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      1200,
      500,
      'JPEG',
      100,
      0,
      (uri) => {
        resolve(uri)
      },
      'base64'
    )
  })

function ClassroomImageForm({
  id: classroomId,
  alias,
  setShowButtonGroup,
  setShowImageForm,
  setShowSummary,
  setShowAlert,
  setAlertMessage,
}) {
  const theme = useTheme()
  const token = useSelector((state) => state.user.Token.token)
  const [showApiFailureAlert, setShowApiFailureAlert] = useState(false)
  const [apiFailureMessage, setApiFailureMessage] = useState('')
  const queryName = `classroom-${alias}`
  const queryKey = [queryName, classroomId]

  const { mutateAsync, isSuccess: isMutationSuccess } = useMutation(
    apiUpdateClassroom,
    useUpdateMutationOptions(queryKey)
  )

  const {
    register,
    handleSubmit,
    formState: { isValid, isSubmitting, errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(classroomImageSchema),
  })

  const onSubmit = async (datas) => {
    const { image } = datas
    const options = {
      headers: { 'x-access-token': token },
      maxContentLength: 100000000,
      maxBodyLength: 1000000000,
    }

    const imageResized = await resizeFile(image[0])

    try {
      await mutateAsync({
        id: classroomId,
        options: options,
        body: {
          image: imageResized,
        },
      })
    } catch (err) {
      // notifyApiFailure(err)
      setShowApiFailureAlert(true)
      setApiFailureMessage(err.message)
    }
  }

  // close the form
  React.useEffect(() => {
    if (isMutationSuccess) {
      setAlertMessage('image correctement modifiée')
      setShowAlert(true)
      setShowImageForm(false)
      setShowButtonGroup(true)
      setShowSummary(true)
    }
  }, [isMutationSuccess])

  return (
    <Grid item container>
      <Grid item container>
        <CustomButton
          action="back"
          text=""
          width="4rem"
          type="button"
          bgcolor={theme.palette.warning.main}
          disabled={isSubmitting}
          onClick={() => {
            setShowImageForm(false)
            setShowButtonGroup(true)
            setShowSummary(true)
          }}
        />
      </Grid>
      <Grid item container justify="center">
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <Grid item container justify="center">
            <Title title="moficication de l image" />
          </Grid>
          <Grid container className="field">
            <input type="file" {...register('image')} />
          </Grid>
          <Grid item container>
            <AlertCollapse
              openAlert={errors.image}
              alertText={errors.image ? errors.image.message : ''}
            />
            <AlertCollapse
              openAlert={showApiFailureAlert}
              alertText={apiFailureMessage}
            />
          </Grid>
          <Grid item container justify="center">
            <CustomButton
              action="post"
              text="je publie mon image"
              type="submit"
              width="100%"
              bgcolor={theme.palette.success.main}
              disabled={!isValid || isSubmitting}
            />
          </Grid>
        </StyledForm>
      </Grid>
    </Grid>
  )
}
ClassroomImageForm.propTypes = {
  id: PropTypes.string.isRequired,
  alias: PropTypes.string.isRequired,
  setShowButtonGroup: PropTypes.func.isRequired,
  setShowImageForm: PropTypes.func.isRequired,
  setShowSummary: PropTypes.func.isRequired,
  setShowAlert: PropTypes.func.isRequired,
  setAlertMessage: PropTypes.func.isRequired,
}

export default ClassroomImageForm
