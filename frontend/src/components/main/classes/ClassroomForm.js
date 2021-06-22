import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { styled, Grid, useTheme } from '@material-ui/core'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useSelector } from 'react-redux'
import { useMutation } from 'react-query'
import Title from '../../elements/Title'
import TinyPageEditor from '../../elements/TinyPageEditor'
import CostumButton from '../../elements/CustomButton'
import { useUpdateMutationOptions } from '../../../utils/hooks'
import { apiPostEntity } from '../../../utils/api'
import classroomSchema from '../../../schemas/classroomSchema'
import ResizeFile from '../../../utils/resizefile'
import InputFileControl from '../../elements/InputFileControl'

const StyledPaperForm = styled('form')(() => ({
  width: '100%',
  margin: '1rem auto',
  background: 'gray',
  //   [theme.breakpoints.up('md')]: {
  //     width: '60%',
  //   },
  '& .form-fields-container': {
    background: 'whitesmoke',
    padding: '0.5rem 0.2rem',
    '& .field': {
      margin: '0.6rem 0px',
    },
  },
}))

function ClassroomForm({
  queryKey,
  setShowClassroomForm,
  setAlert,
  classroomData,
}) {
  const { _id, name, summary } = classroomData
  const theme = useTheme()
  const { Token } = useSelector((state) => state.user)
  const formTitle = `Modification de classe ${name}`

  const { mutateAsync } = useMutation(
    apiPostEntity,
    useUpdateMutationOptions(queryKey)
  )

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(classroomSchema),
  })

  const onSubmit = async (datas) => {
    const { text, image } = datas

    const options = {
      headers: { 'x-access-token': Token },
    }
    const finalDatas = { text, image: await ResizeFile(image[0]) }

    try {
      await mutateAsync({
        id: _id,
        action: 'update',
        options: options,
        body: finalDatas,
      }).then((response) => {
        setAlert({
          severity: 'success',
          alertText: response.message,
          openAlert: true,
        })
        setShowClassroomForm(false)
        window.scrollTo(0, 0)
      })
    } catch (err) {
      setAlert({
        severity: 'error',
        alertText: err.response.message,
        openAlert: true,
      })
      window.scrollTo(0, 0)
    }
  }

  //   useEffect(() => {
  //     setShowClassroomForm(false)
  //     return () => {
  //       setShowClassroomForm(true)
  //       setAlert({
  //         severity: 'error',
  //         alertText: '',
  //         openAlert: false,
  //       })
  //     }
  //   }, [])
  return (
    <StyledPaperForm onSubmit={handleSubmit(onSubmit)}>
      <Grid item container justify="center">
        <Title title={formTitle} textcolor="whitesmoke" />
      </Grid>
      <Grid container className="form-fields-container">
        <InputFileControl
          control={control}
          name="image"
          type="file"
          helpertext="maximum 5Mo"
          accept="image/jpg,image/jpeg,image/gif,image/png "
        />
        <Grid item container>
          <Controller
            name="summary"
            control={control}
            defaultValue={classroomData ? classroomData.summary : null}
            render={({ field: { onChange, value } }) => (
              <TinyPageEditor onChange={onChange} value={value} />
            )}
          />
        </Grid>
      </Grid>
      <Grid item container alignItems="center" justify="flex-end">
        <CostumButton
          text={`Je modifie la page ${name}`}
          bgcolor={theme.palette.success.main}
          action="post"
          width="500px"
          type="submit"
          disabled={isSubmitting || !isValid}
        />
      </Grid>
    </StyledPaperForm>
  )
}

ClassroomForm.propTypes = {
  setShowClassroomForm: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  queryKey: PropTypes.arrayOf(PropTypes.string).isRequired,
  classroomData: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    summary: PropTypes.string,
  }).isRequired,
}

export default ClassroomForm
