import React from 'react'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import { List, ListItem, ListSubheader, Button } from '@material-ui/core'
import { useSnackbar } from 'notistack'
import { useSelector } from 'react-redux'
import StyledHookForm from '../../../../../styled-components/StyledHookForm'
import TextInput from '../../../../../elements/inputs/TextInput'
import MutateCircularProgress from '../../../../../elements/MutateCircularProgress'
import useMutate from '../../../../../hooks/useMutate'
import SmallEditorInput from '../../../../../elements/inputs/SmallEditorInput'
import DatePickerInput from '../../../../../elements/inputs/DatePickerInput'
import { apiPostMails } from '../../../../../../utils/api'
import getResponse from '../../../../../../utils/getResponse'
import getError from '../../../../../../utils/getError'

function ManageMailForm({ queryKey, setShowForm }) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const { Token } = useSelector((state) => state.user)
  const { mutateAsync, isMutating } = useMutate(queryKey, apiPostMails)
  const { control, handleSubmit } = useForm({
    mode: 'onChange',
  })

  const onSubmit = async (datas) => {
    const { title, datetosend, content } = datas

    const finalDatas = {
      title,
      content,
      datetosend: datetosend.valueOf(),
    }
    const options = {
      headers: { 'x-access-token': Token },
    }

    closeSnackbar()

    try {
      await mutateAsync({
        id: null,
        action: 'create',
        options: options,
        body: finalDatas,
      }).then((response) => {
        enqueueSnackbar(getResponse(response), { variant: 'success' })
        setShowForm(false)
        window.scrollTo(0, 0)
      })
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: 'error' })
      window.scrollTo(0, 0)
    }
  }

  return (
    <StyledHookForm onSubmit={handleSubmit(onSubmit)}>
      {isMutating && <MutateCircularProgress />}
      <List
        className="form-fields-container"
        component="div"
        aria-labelledby="liste des messages envoyés"
        subheader={
          <ListSubheader component="div" id="titre liste des messages">
            Liste des messages envoyés
          </ListSubheader>
        }
      >
        <ListItem className="field">
          <TextInput
            control={control}
            name="title"
            defaultValue=""
            label="Sujet "
            example="plus de 5 caractètes , moins de 50"
            variant="standard"
            rules={{
              required: 'le titre est obligatoire',
              minLength: {
                value: 5,
                message: 'le titre doit avoir au moins 5 caractères',
              },
              maxLength: {
                value: 50,
                message: 'le titre doit avoir au plus 50 caractères',
              },
            }}
          />
        </ListItem>
        <ListItem className="field">
          <DatePickerInput
            control={control}
            name="datetosend"
            label="Date de l'envoi"
            format="dddd Do MMMM yyyy"
            defaultValue={new Date()}
            variant="standard"
          />
        </ListItem>
        <ListItem className="field">
          <SmallEditorInput
            name="content"
            control={control}
            defaultValue=""
            label="Message"
            rules={{
              required: 'le contenu est obligatoire',
              minLength: {
                value: 20,
                message: 'Le contenu doit avoir au moins 20 caractères',
              },
              maxLength: {
                value: 2000,
                message: 'Le contenu doit avoir au plus 2000 caractères',
              },
            }}
          />
        </ListItem>
        <ListItem>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            fullWidth
            size="large"
          >
            je poste ma suggestion
          </Button>
        </ListItem>
      </List>
    </StyledHookForm>
  )
}

ManageMailForm.propTypes = {
  queryKey: PropTypes.arrayOf(PropTypes.string).isRequired,
  setShowForm: PropTypes.func.isRequired,
}

export default ManageMailForm
