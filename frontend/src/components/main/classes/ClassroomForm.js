import React from 'react'
import PropTypes from 'prop-types'
import { useSnackbar } from 'notistack'
import { styled, Grid, useTheme } from '@material-ui/core'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useSelector } from 'react-redux'
import Title from '../../elements/Title'
import CostumButton from '../../elements/CustomButton'
import { apiPostEntity } from '../../../utils/api'
import classroomSchema from '../../../schemas/classroomSchema'
import InputReactPageControl from '../../elements/InputReactPageControl'
import InputTextControl from '../../elements/InputTextControl'
import InputRadio from '../../elements/InputRadio'
import useRigths from '../../hooks/useRigths'
import useMutate from '../../hooks/useMutate'
import MutateCircularProgress from '../../elements/MutateCircularProgress'
import getError from '../../../utils/getError'
import getResponse from '../../../utils/getResponse'

const StyledPaperForm = styled('form')(() => ({
  width: '100%',
  margin: '1rem auto',
  background: 'gray',

  '& .form-fields-container': {
    background: 'whitesmoke',
    padding: '0.5rem 0.2rem',
    '& .field': {
      margin: '0.6rem 0px',
    },
  },
}))

const StyledRadioDiv = styled('div')(() => ({
  display: 'none',
}))

function ClassroomForm({
  queryKey,
  setShowClassroomForm,
  setCurrentClassroom,
  currentClassroom,
}) {
  const theme = useTheme()

  const { moderatorLevel } = useRigths()
  const { Token } = useSelector((state) => state.user)
  const formTitle = `Modification de classe ${currentClassroom?.name}`
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const { mutateAsync, isMutating } = useMutate(queryKey, apiPostEntity)

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(classroomSchema),
  })

  const onSubmit = async (datas) => {
    const { content, email } = datas

    const options = {
      headers: { 'x-access-token': Token },
    }
    const finalDatas = { content: JSON.stringify(content), email }
    closeSnackbar()
    try {
      await mutateAsync({
        id: currentClassroom.id,
        action: 'update',
        options: options,
        body: finalDatas,
      }).then((response) => {
        enqueueSnackbar(getResponse(response), { variant: 'success' })
        setShowClassroomForm(false)
        window.scrollTo(0, 0)
      })
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: 'error' })
      window.scrollTo(0, 0)
    }
  }

  return (
    <StyledPaperForm onSubmit={handleSubmit(onSubmit)}>
      <Grid item container justifyContent="center">
        <Title title={formTitle} textcolor="whitesmoke" />
      </Grid>
      {isMutating && <MutateCircularProgress />}
      <Grid container className="form-fields-container">
        {moderatorLevel && (
          <InputTextControl
            name="email"
            label="email de la classe"
            control={control}
            initialValue={currentClassroom ? currentClassroom.email : null}
          />
        )}
        <InputReactPageControl
          control={control}
          name="content"
          initialValue={currentClassroom ? currentClassroom.content : null}
          label="Description de la classe"
        />
        <StyledRadioDiv>
          <InputRadio
            question="tu as le droit ?"
            options={[
              { labelOption: 'Oui', optionvalue: 'oui' },
              { labelOption: 'Non', optionvalue: 'non' },
            ]}
            name="isAllowed"
            defaultValue={moderatorLevel ? 'oui' : 'non'}
            control={control}
            radioGroupProps={{ row: true }}
            display="block"
          />
        </StyledRadioDiv>
      </Grid>
      <Grid item container alignItems="center" justify="flex-end">
        <CostumButton
          text={`Je modifie la page ${currentClassroom?.name}`}
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

ClassroomForm.defaultProps = {
  currentClassroom: null,
}

ClassroomForm.propTypes = {
  setShowClassroomForm: PropTypes.func.isRequired,
  setCurrentClassroom: PropTypes.func.isRequired,
  currentClassroom: PropTypes.shape({
    id: PropTypes.number,
    content: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
  }),
  queryKey: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default ClassroomForm
