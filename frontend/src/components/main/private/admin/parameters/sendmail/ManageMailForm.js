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

function ManageMailForm({ queryKey, queryParams }) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const { Token } = useSelector((state) => state.user)
  const { mutateAsync, isMutating } = useMutate(queryKey, 'poster')
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm({
    mode: 'onChange',
    // resolver: yupResolver(paperActiviteSchema),
  })

  const onSubmit = async (datas) => {
    console.log('datas', datas)
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
            variant="outlined"
            rules={{
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
  queryParams: PropTypes.string.isRequired,
  queryKey: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default ManageMailForm
