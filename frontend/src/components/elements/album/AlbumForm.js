import { yupResolver } from '@hookform/resolvers/yup'
import { Grid, styled, useTheme } from '@material-ui/core'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { setAlbumMutateAlert } from '../../../redux/alerts/AlertsActions'
import albumSchema from '../../../schemas/albumSchema'
import { apiPostAlbum } from '../../../utils/api'
import { useRouteDatas, useUpdateMutationOptions } from '../../../utils/hooks'
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
  const history = useHistory()
  const dispatch = useDispatch()
  const { Token } = useSelector((state) => state.user)
  const [addFile, setAddFile] = useState(true)

  const {
    mutateAsync,
    isSuccess,
    isError,
    data: mutationData,
    error,
  } = useMutation(apiPostAlbum, useUpdateMutationOptions(queryKey))
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(albumSchema),
  })

  const onSubmit = async (datas) => {
    const { description, file, name } = datas

    const finalDatas = {
      description,
      name,
      file: file ? file[0] : null,
      alias: currentAlbum
        ? currentAlbum.alias
        : `${(await new Date().getTime()) / 1000}`,
    }

    const options = {
      headers: {
        'x-access-token': Token,
      },
    }

    try {
      await mutateAsync({
        id: null,
        action: 'create',
        options: options,
        body: finalDatas,
        Token: Token,
        entityAlias: entityAlias,
      }).then(() => {
        window.scrollTo(0, 0)
      })
    } catch (err) {
      window.scrollTo(0, 0)
    }
  }

  useEffect(() => {
    if (isError) {
      dispatch(
        setAlbumMutateAlert({
          openAlert: true,
          severity: 'error',
          alertText: error.response.data.message,
        })
      )
    }
    if (mutationData) {
      setFormAction('create')
      setCurrentAlbum(null)
      dispatch(
        setAlbumMutateAlert({
          openAlert: true,
          severity: 'success',
          alertText: mutationData.message,
        })
      )
      setShow({
        page: false,
        form: false,
        list: true,
      })
      window.scrollTo(0, 0)
    }
  }, [isSuccess, isError, mutationData, error])

  const displayRadio = formAction === 'update' ? 'block' : 'none'

  const formTitle =
    formAction === 'create' ? 'Créer un album' : "Modifier l'album"
  return (
    <Grid item container>
      <StyledPaperForm onSubmit={handleSubmit(onSubmit)}>
        <Grid item container justify="center">
          <Title title={formTitle} textcolor="whitesmoke" />
        </Grid>
        <Grid container className="form-fields-container">
          <InputTextControl
            control={control}
            name="name"
            label="Nom de l'album"
            initialvalue={currentAlbum ? currentAlbum.name : ''}
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
            defaultValue="oui"
            callback={setAddFile}
            control={control}
            radioGroupProps={{ row: true }}
            display={displayRadio}
          />
          {addFile && (
            <InputFileControl
              control={control}
              label="Image de couverture"
              name="file"
              type="file"
              accept="image/jpg,image/jpeg,image/gif,image/png "
              helperText="maximum 4Mo"
            />
          )}
        </Grid>
        <Grid item container alignItems="center" justify="flex-end">
          <CostumButton
            text={
              formAction === 'update'
                ? `Modifier l'album`
                : `Poster créer un album`
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
    name: PropTypes.string,
    description: PropTypes.string,
    alias: PropTypes.string,
    entity: PropTypes.shape({
      alias: PropTypes.string,
    }),
  }),
}

export default AlbumForm
