/* eslint-disable import/named */
import { Grid, styled, useTheme, TextField } from '@material-ui/core'
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import PropTypes from 'prop-types'
import { useSnackbar } from 'notistack'
import { useSelector } from 'react-redux'
import { apiPostAlbumImages } from '../../../utils/api'
import Title from '../Title'
import CostumButton from '../CustomButton'
import useMutate from '../../hooks/useMutate'
import MutateCircularProgress from '../MutateCircularProgress'
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

function AlbumPageForm({ queryKey, currentAlbum, entityAlias, setShowPage }) {
  const theme = useTheme()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const { Token } = useSelector((state) => state.user)
  const { mutateAsync, isMutating } = useMutate(queryKey, apiPostAlbumImages)

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid, errors },
  } = useForm({
    mode: 'onChange',
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
        enqueueSnackbar(getResponse(response), { variant: 'success' })
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

  const formTitle = 'Ajouter des images'

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
          <Controller
            name="files"
            control={control}
            defaultValue=""
            rules={{
              validate: {
                minlenght: (value) =>
                  value.length > 0 || '1 fichier au moins est requis',
                maxlenght: (value) =>
                  value.length < 16 ||
                  'Vous ne pouvez telecharger que 15 fichiers maximum en meme temps',
                filesize: (value) =>
                  value[0].size <= 1024 * 1024 * 10 ||
                  'Chacune des images doit faire moins de 10Mo',
              },
            }}
            render={({ field }) => (
              <TextField
                variant="outlined"
                fullWidth
                type="file"
                id="images"
                label="Images"
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  multiple: true,
                  accept: 'image/jpg,image/jpeg,image/gif,image/png',
                }}
                onChange={(e) => {
                  field.onChange(e.target.files)
                }}
                error={Boolean(errors.files)}
                helperText={errors.files ? errors.files.message : ''}
              />
            )}
          />
        </Grid>
        <Grid item container alignItems="center" justifyContent="flex-end">
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
