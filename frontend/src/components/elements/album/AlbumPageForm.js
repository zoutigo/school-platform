/* eslint-disable import/named */
import { Grid, List, ListItem, Button } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import PropTypes from 'prop-types'
import { useSnackbar } from 'notistack'
import { useSelector } from 'react-redux'
import { apiPostAlbumImages } from '../../../utils/api'
import Title from '../Title'
import useMutate from '../../hooks/useMutate'
import MutateCircularProgress from '../MutateCircularProgress'
import getError from '../../../utils/getError'
import getResponse from '../../../utils/getResponse'
import StyledHookForm from '../../styled-components/StyledHookForm'
import FileInput from '../inputs/FileInput'

function AlbumPageForm({ queryKey, currentAlbum, entityAlias, setShowPage }) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const { Token } = useSelector((state) => state.user)
  const { mutateAsync, isMutating } = useMutate(queryKey, apiPostAlbumImages)

  const { control, handleSubmit } = useForm({
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
      <StyledHookForm onSubmit={handleSubmit(onSubmit)}>
        <Grid item container justifyContent="center">
          <Title title={formTitle} textcolor="whitesmoke" />
        </Grid>
        {isMutating && <MutateCircularProgress />}
        <List className="form-fields-container">
          <ListItem className="field">
            <FileInput
              control={control}
              defaultValue=""
              multiple
              label="Ajouter des images"
              example="Fichiers jpg,jpeg,gif,png, maximum 10Mo par image"
              accept="image/jpg,image/jpeg,image/gif,image/png"
            />
          </ListItem>
          <ListItem>
            <Button
              type="submit"
              color="secondary"
              variant="contained"
              fullWidth
              size="large"
            >
              Je publie mes images
            </Button>
          </ListItem>
        </List>
      </StyledHookForm>
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
