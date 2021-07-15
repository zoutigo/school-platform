import { Grid, styled, useTheme } from '@material-ui/core'
import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import PropTypes from 'prop-types'
import { useMutation } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'
import { apiPostAlbumImages } from '../../../utils/api'
import { useUpdateMutationOptions } from '../../../utils/hooks'
import albumImagesSchema from '../../../schemas/albumImagesSchema'
import Title from '../Title'
import InputFileControl from '../InputFileControl'
import CostumButton from '../CustomButton'
import { setAlbumPageMutateAlert } from '../../../redux/alerts/AlertsActions'

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

function AlbumPageForm({ queryKey, currentAlbum, entityAlias, setShowPage }) {
  const theme = useTheme()

  const dispatch = useDispatch()
  const { Token } = useSelector((state) => state.user)

  const { mutateAsync } = useMutation(
    apiPostAlbumImages,
    useUpdateMutationOptions(queryKey)
  )

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(albumImagesSchema),
  })

  const onSubmit = async (datas) => {
    const { files } = datas

    const finalDatas = {
      files: files,
    }

    const options = {
      headers: {
        'x-access-token': Token,
      },
    }

    try {
      await mutateAsync({
        id: currentAlbum._id,
        action: 'create',
        options: options,
        body: finalDatas,
        Token: Token,
        entityAlias: entityAlias,
      }).then((response) => {
        dispatch(
          setAlbumPageMutateAlert({
            severity: 'success',
            alertText: response.message,
            openAlert: true,
          })
        )
        setShowPage({
          imagesForm: false,
          imagesList: true,
        })
        window.scrollTo(0, 0)
      })
    } catch (err) {
      console.log(err)
      dispatch(
        setAlbumPageMutateAlert({
          severity: 'error',
          alertText: err.response.message,
          alertOpen: true,
        })
      )
      window.scrollTo(0, 0)
    }
  }

  const formTitle = 'Ajouter des images'

  return (
    <Grid item container>
      <StyledPaperForm onSubmit={handleSubmit(onSubmit)}>
        <Grid item container justify="center">
          <Title title={formTitle} textcolor="whitesmoke" />
        </Grid>
        <Grid container className="form-fields-container">
          <InputFileControl
            control={control}
            label="Image de couverture"
            name="files"
            type="file"
            multiple
            accept="image/jpg,image/jpeg,image/gif,image/png "
            helperText="maximum 4Mo"
          />
        </Grid>
        <Grid item container alignItems="center" justify="flex-end">
          <CostumButton
            text="J'envoie mes images"
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

AlbumPageForm.defaultProps = null

AlbumPageForm.propTypes = {
  currentAlbum: PropTypes.shape({
    _id: PropTypes.string,
    alias: PropTypes.string,
    name: PropTypes.string,
  }),
  queryKey: PropTypes.arrayOf(PropTypes.string).isRequired,
  entityAlias: PropTypes.string,
  setShowPage: PropTypes.func.isRequired,
}

export default AlbumPageForm
