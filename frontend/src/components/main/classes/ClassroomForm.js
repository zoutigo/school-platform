import React from 'react'
import PropTypes from 'prop-types'
import { useSnackbar } from 'notistack'
import { useTheme, List, ListItem, Button } from '@material-ui/core'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import Title from '../../elements/Title'
import { apiPostEntity } from '../../../utils/api'
import useMutate from '../../hooks/useMutate'
import MutateCircularProgress from '../../elements/MutateCircularProgress'
import getError from '../../../utils/getError'
import getResponse from '../../../utils/getResponse'
import ReactPageInput from '../../elements/inputs/ReactPageInput'
import TextInput from '../../elements/inputs/TextInput'
import StyledHookForm from '../../styled-components/StyledHookForm'

function ClassroomForm({
  queryKey,
  setShowClassroomForm,
  setCurrentClassroom,
  currentClassroom,
  isAllowedToChange,
}) {
  const { Token } = useSelector((state) => state.user)
  const formTitle = `Modification de classe ${currentClassroom?.name}`
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const { mutateAsync, isMutating } = useMutate(queryKey, apiPostEntity)
  const buttonText = `Je modifie la page ${currentClassroom?.name}`
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    mode: 'onChange',
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
    <StyledHookForm onSubmit={handleSubmit(onSubmit)}>
      {(isMutating || isSubmitting) && <MutateCircularProgress />}
      {isAllowedToChange && (
        <List className="form-fields-container">
          <ListItem className="title">
            <Title title={formTitle} textcolor="whitesmoke" />
          </ListItem>
          <ListItem clasname="field">
            <TextInput
              name="email"
              label="email de la classe"
              control={control}
              defaultValue={currentClassroom ? currentClassroom.email : null}
              rules={{
                required: 'le mail est obligatoire',
                pattern: {
                  value: /^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/,
                  message: 'Veillez saisir un mail au format correct',
                },
                maxLength: {
                  value: 50,
                  message: 'le mail ne peut avoir plus de 50 caractères',
                },
              }}
              example="Une adresse correcte"
              variant="standard"
              width="100%"
            />
          </ListItem>
          <ListItem classname="field">
            <ReactPageInput
              control={control}
              name="content"
              defaultValue={currentClassroom ? currentClassroom.content : null}
              label="Description de la classe"
            />
          </ListItem>
          <ListItem>
            <Button
              type="submit"
              color="secondary"
              fullWidth
              variant="contained"
            >
              {buttonText}
            </Button>
          </ListItem>
        </List>
      )}
    </StyledHookForm>
  )
}

ClassroomForm.defaultProps = {
  currentClassroom: null,
}

ClassroomForm.propTypes = {
  setShowClassroomForm: PropTypes.func.isRequired,
  setCurrentClassroom: PropTypes.func.isRequired,
  isAllowedToChange: PropTypes.bool.isRequired,
  currentClassroom: PropTypes.shape({
    id: PropTypes.number,
    content: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
  }),
  queryKey: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default ClassroomForm
