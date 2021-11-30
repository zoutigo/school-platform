/* eslint-disable import/named */
import { Grid, List, ListItem, Button, Typography } from '@material-ui/core'
import { useSnackbar } from 'notistack'
import PropTypes from 'prop-types'
import React, { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { apiPostAlbum } from '../../../utils/api'
import getError from '../../../utils/getError'
import getResponse from '../../../utils/getResponse'
import useMutate from '../../hooks/useMutate'
import StyledHookForm from '../../styled-components/StyledHookForm'
import FileInput from '../inputs/FileInput'
import RadioInput from '../inputs/RadioInput'
import SmallEditorInput from '../inputs/SmallEditorInput'
import TextInput from '../inputs/TextInput'
import MutateCircularProgress from '../MutateCircularProgress'
import Title from '../Title'

function AlbumForm({
  setCurrentAlbum,
  formAction,
  setShow,
  setFormAction,
  queryKey,
  currentAlbum,
  entityAlias,
}) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const dispatch = useDispatch()
  const { Token } = useSelector((state) => state.user)

  const { mutateAsync, isMutating } = useMutate(queryKey, apiPostAlbum)
  const { control, handleSubmit } = useForm({
    mode: 'onChange',
  })

  const onSubmit = async (datas) => {
    const { description, file, name, isPrivate } = datas

    const finalDatas = {
      description,
      name,
      isPrivate: isPrivate === 'oui',
      file: file ? file[0] : null,
      alias: currentAlbum
        ? currentAlbum.alias
        : `${await new Date().getTime()}`,
    }

    const options = {
      headers: {
        'x-access-token': Token,
      },
    }
    closeSnackbar()
    try {
      await mutateAsync({
        id: formAction === 'update' ? currentAlbum.id : null,
        action: formAction,
        options: options,
        body: finalDatas,
        Token: Token,
        entityAlias: entityAlias,
      }).then((response) => {
        enqueueSnackbar(getResponse(response), { variant: 'success' })
        setShow({
          page: false,
          form: false,
          list: true,
        })
        window.scrollTo(0, 0)
      })
    } catch (err) {
      dispatch(enqueueSnackbar(getError(err), { variant: 'error' }))
      window.scrollTo(0, 0)
    }
  }

  // eslint-disable-next-line arrow-body-style
  useEffect(() => {
    return () => {
      setFormAction('create')
      setCurrentAlbum(null)
    }
  }, [])

  const formTitle =
    formAction === 'create' ? 'Créer un album' : "Modifier l'album"

  const isPrivateDefaultValue = useCallback(() => {
    if (formAction === 'create') return 'oui'
    if (currentAlbum.isPrivate) return 'oui'
    return 'non'
  }, [formAction, currentAlbum])
  return (
    <Grid item container>
      <StyledHookForm onSubmit={handleSubmit(onSubmit)}>
        <Grid item container justifyContent="center">
          <Title title={formTitle} textcolor="whitesmoke" />
        </Grid>
        {isMutating && <MutateCircularProgress />}
        <List className="form-fields-container">
          <ListItem className="field">
            <TextInput
              control={control}
              name="name"
              label="Nom de l'album"
              defaultValue={currentAlbum ? currentAlbum.name : ''}
              variant="standard"
              example="Plus de 2 caractères et moins de 30 caractères"
              rules={{
                required: "le nom de l'album est obligatoire",
                minLength: {
                  value: 2,
                  message: "le nom de l'album doit avoir 2 caractères au moins",
                },
                maxLength: {
                  value: 30,
                  message:
                    "le nom de l'album doit avoir 30 caractères au moins",
                },
              }}
            />
          </ListItem>
          <ListItem className="field">
            <SmallEditorInput
              control={control}
              name="description"
              label="Description"
              defaultValue={currentAlbum ? currentAlbum.description : ''}
              rules={{
                required: 'la description est obligatoire',
                minLength: {
                  value: 2,
                  message: 'La suggestion doit avoir au moins 2 caractères',
                },
                maxLength: {
                  value: 300,
                  message: 'La description doit avoir au plus 300 caractères',
                },
              }}
            />
          </ListItem>
          <ListItem className="field">
            <RadioInput
              question="Album privé ?"
              options={[
                { labelOption: 'Oui', optionvalue: 'oui' },
                { labelOption: 'Non', optionvalue: 'non' },
              ]}
              name="isPrivate"
              defaultValue={isPrivateDefaultValue}
              control={control}
              radioGroupProps={{ row: true }}
              variant="standard"
              rules={{
                required: 'veillez choisir une option',
              }}
            />
          </ListItem>

          {formAction === 'create' && (
            <ListItem className="field">
              <FileInput
                control={control}
                multiple={false}
                label="Ajouter une image de couverture"
                example="Fichiers jpg,jpeg,gif,png, maximum 10Mo"
                defaultValue=""
                accept="image/jpg,image/jpeg,image/gif,image/png"
              />
            </ListItem>
          )}
          <ListItem>
            <Typography
              variant="body1"
              style={{ letterSpacing: '1px', fontWeight: 'bold' }}
            >
              Vous pourrez y insérer des photos supplémentaires une fois que
              votre album sera crée.
            </Typography>
          </ListItem>
          <ListItem>
            <Button
              type="submit"
              color="secondary"
              variant="contained"
              fullWidth
              size="large"
            >
              {formAction === 'update' ? `Modifier l'album` : `Créer un album`}
            </Button>
          </ListItem>
        </List>
      </StyledHookForm>
    </Grid>
  )
}

AlbumForm.defaultProps = {
  formAction: 'create',
  currentAlbum: null,
}

AlbumForm.propTypes = {
  formAction: PropTypes.string,
  setFormAction: PropTypes.func.isRequired,
  setShow: PropTypes.func.isRequired,
  queryKey: PropTypes.arrayOf(PropTypes.string).isRequired,
  setCurrentAlbum: PropTypes.func.isRequired,
  entityAlias: PropTypes.string.isRequired,
  currentAlbum: PropTypes.shape({
    id: PropTypes.string,
    isPrivate: PropTypes.bool,
    name: PropTypes.string,
    description: PropTypes.string,
    alias: PropTypes.string,
    entity: PropTypes.shape({
      alias: PropTypes.string,
    }),
  }),
}

export default AlbumForm
