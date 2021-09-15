/* eslint-disable import/named */
import { yupResolver } from '@hookform/resolvers/yup'
import { Grid, styled, useTheme } from '@material-ui/core'
import PropTypes from 'prop-types'
import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'
import {
  errorAlertCollapse,
  successAlertCollapse,
} from '../../../constants/alerts'
import { setAlbumMutateAlert } from '../../../redux/alerts/AlertsActions'
import albumSchema from '../../../schemas/albumSchema'
import { apiPostAlbum } from '../../../utils/api'
import { useUpdateMutationOptions } from '../../../utils/hooks'
import CostumButton from '../CustomButton'
import InputFileControl from '../InputFileControl'
import InputRadio from '../InputRadio'
import InputSmallEditorControl from '../InputSmallEditorControl'
import InputTextControl from '../InputTextControl'
import Title from '../Title'

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

function AlbumForm({
  setCurrentAlbum,
  formAction,
  setShow,
  setFormAction,
  queryKey,
  currentAlbum,
  entityAlias,
}) {
  const theme = useTheme()

  const dispatch = useDispatch()
  const { Token } = useSelector((state) => state.user)
  const [addFile, setAddFile] = useState(true)

  const { mutateAsync } = useMutation(
    apiPostAlbum,
    useUpdateMutationOptions(queryKey)
  )
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(albumSchema),
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

    try {
      await mutateAsync({
        id: formAction === 'update' ? currentAlbum.id : null,
        action: formAction,
        options: options,
        body: finalDatas,
        Token: Token,
        entityAlias: entityAlias,
      }).then((response) => {
        dispatch(setAlbumMutateAlert(successAlertCollapse(response.message)))
        setShow({
          page: false,
          form: false,
          list: true,
        })
        window.scrollTo(0, 0)
      })
    } catch (err) {
      dispatch(
        setAlbumMutateAlert(errorAlertCollapse(err.response.data.message))
      )
      window.scrollTo(0, 0)
    }
  }

  // eslint-disable-next-line arrow-body-style
  useEffect(() => {
    if (formAction === 'update') {
      setAddFile(false)
    }
    return () => {
      setFormAction('create')
      setCurrentAlbum(null)
    }
  }, [])

  const displayRadio = formAction === 'update' ? 'block' : 'none'

  const formTitle =
    formAction === 'create' ? 'Créer un album' : "Modifier l'album"

  const isPrivateDefaultValue = useCallback(() => {
    if (formAction === 'create') return 'oui'
    if (currentAlbum.isPrivate) return 'oui'
    return 'non'
  }, [formAction, currentAlbum])
  return (
    <Grid item container>
      <StyledPaperForm onSubmit={handleSubmit(onSubmit)}>
        <Grid item container justifyContent="center">
          <Title title={formTitle} textcolor="whitesmoke" />
        </Grid>
        <Grid container className="form-fields-container">
          <InputTextControl
            control={control}
            name="name"
            label="Nom de l'album"
            initialValue={currentAlbum ? currentAlbum.name : ''}
          />
          <InputSmallEditorControl
            control={control}
            name="description"
            initialValue={currentAlbum ? currentAlbum.description : ''}
            label="Description de l'album"
            width="100%"
            height={100}
          />

          <InputRadio
            question="Modifier l'image de couverture ?"
            options={[
              { labelOption: 'Oui', optionvalue: 'oui' },
              { labelOption: 'Non', optionvalue: 'non' },
            ]}
            name="addFile"
            defaultValue="non"
            callback={setAddFile}
            control={control}
            radioGroupProps={{ row: true }}
            display={displayRadio}
          />
          <InputRadio
            question="L'album reste privé ?"
            options={[
              { labelOption: 'Oui', optionvalue: 'oui' },
              { labelOption: 'Non', optionvalue: 'non' },
            ]}
            name="isPrivate"
            defaultValue={isPrivateDefaultValue}
            control={control}
            radioGroupProps={{ row: true }}
            display="block"
          />

          {addFile && (
            <InputFileControl
              control={control}
              label="Image de couverture"
              name="file"
              type="file"
              accept="image/jpg,image/jpeg,image/gif,image/png "
              helperText="maximum 10Mo"
            />
          )}
        </Grid>
        <Grid item container alignItems="center" justify="flex-end">
          <CostumButton
            text={
              formAction === 'update' ? `Modifier l'album` : `Créer un album`
            }
            bgcolor={theme.palette.success.main}
            action="post"
            width="300px"
            type="submit"
            disabled={!isValid || isSubmitting}
          />
        </Grid>
      </StyledPaperForm>
    </Grid>
  )
}

AlbumForm.defaultProps = null

AlbumForm.propTypes = {
  formAction: PropTypes.string.isRequired,
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
