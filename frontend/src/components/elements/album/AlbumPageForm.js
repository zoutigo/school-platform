/* eslint-disable import/named */
import { Grid, styled, useTheme } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import PropTypes from 'prop-types'
import { useSnackbar } from 'notistack'
import { useSelector } from 'react-redux'
import { apiPostAlbumImages } from '../../../utils/api'
import albumImagesSchema from '../../../schemas/albumImagesSchema'
import Title from '../Title'
import InputFileControl from '../InputFileControl'
import CostumButton from '../CustomButton'
import useMutate from '../../hooks/useMutate'
import MutateCircularProgress from '../MutateCircularProgress'
import getError from '../../../utils/error'

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
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const { Token } = useSelector((state) => state.user)
  const { mutateAsync, isMutating } = useMutate(queryKey, apiPostAlbumImages)

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
    closeSnackbar()
    try {
      await mutateAsync({
        id: currentAlbum.id,
        action: 'create',
        options: options,
        body: finalDatas,
        Token: Token,
        entityAlias: entityAlias,
      }).then((response) => {
        enqueueSnackbar(response.message, { variant: 'success' })
        setShowPage({
          imagesForm: false,
          imagesList: true,
        })
        window.scrollTo(0, 0)
      })
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: 'error' })
      window.scrollTo(0, 0)
    }
  }

  const formTitle = 'Ajouter des images ?'

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <Grid item container>
      <StyledPaperForm onSubmit={handleSubmit(onSubmit)}>
        <Grid item container justifyContent="center">
          <Title title={formTitle} textcolor="whitesmoke" />
        </Grid>
        {isMutating && <MutateCircularProgress />}
        <Grid container className="form-fields-container">
          <InputFileControl
            control={control}
            label="Image"
            name="files"
            type="file"
            multiple
            accept="image/jpg,image/jpeg,image/gif,image/png "
            helperText="maximum 10Mo"
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
    id: PropTypes.string,
    alias: PropTypes.string,
    name: PropTypes.string,
  }),
  queryKey: PropTypes.arrayOf(PropTypes.string).isRequired,
  entityAlias: PropTypes.string,
  setShowPage: PropTypes.func.isRequired,
}

export default AlbumPageForm
