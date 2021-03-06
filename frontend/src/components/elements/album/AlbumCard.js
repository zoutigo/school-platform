/* eslint-disable import/named */
import React, { useState } from 'react'
import { styled, useTheme } from '@material-ui/core/styles'
import { useSnackbar } from 'notistack'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import ReactHtmlParser from 'react-html-parser'
import { Collapse, Grid } from '@material-ui/core'
import { apiPostAlbum } from '../../../utils/api'

import CustomButton from '../CustomButton'
import useMutate from '../../hooks/useMutate'
import MutateCircularProgress from '../MutateCircularProgress'
import getError from '../../../utils/getError'
import getResponse from '../../../utils/getResponse'

const StyledCard = styled(Card)(({ theme }) => ({
  margin: '1rem auto',
  maxWidth: 345,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  '& .area': {
    '& .media': {
      height: 180,
    },
    '& .title': {
      color: theme.palette.secondary.dark,
    },
  },
}))

const StyledCollapse = styled(Collapse)(() => ({
  width: '100%',
  background: 'transparent',
}))

const StyledCardActions = styled(CardActions)(({ bgcolor }) => ({
  background: bgcolor || 'transparent',
}))

function AlbumCard({
  album,
  setCurrentAlbum,
  setFormAction,
  setShow,
  entityAlias,
  isAllowed,
  queryKey,
}) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const theme = useTheme()
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [showUpdateConfirm, setShowUpdateConfirm] = useState(false)
  const { URL_PREFIX } = useSelector((state) => state.settings)
  const { Token } = useSelector((state) => state.user)
  const { description, files, name } = album
  const image =
    files && files.length > 0 ? `${URL_PREFIX}/${files[0].filepath}` : null

  const { mutateAsync, isMutating } = useMutate(queryKey, apiPostAlbum)

  const handleClick = () => {
    setCurrentAlbum(album)
    setShow({
      form: false,
      page: true,
      list: false,
    })
    window.scrollTo(0, 0)
  }

  const handleConfirmDelete = () => {
    setShowDeleteConfirm(!showDeleteConfirm)
    setShowUpdateConfirm(false)
  }
  const handleConfirmUpdate = () => {
    setShowUpdateConfirm(!showUpdateConfirm)
    setShowDeleteConfirm(false)
  }

  closeSnackbar()

  const handleDelete = async () => {
    try {
      await mutateAsync({
        id: album.id,
        action: 'delete',
        Token,
        entityAlias,
      }).then((response) => {
        enqueueSnackbar(getResponse(response), { variant: 'success' })
        setShowDeleteConfirm(false)
      })
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: 'error' })
    }
  }

  const handleUpdate = () => {
    setCurrentAlbum(album)
    setFormAction('update')
    setShow({
      page: false,
      list: false,
      form: true,
    })
  }

  if (isMutating) return <MutateCircularProgress />

  return (
    <StyledCard>
      <CardActionArea className="area" onClick={handleClick}>
        <CardMedia className="media" image={image} title={name} />
        <CardContent className="title">
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {ReactHtmlParser(description)}
          </Typography>
          {isAllowed && (
            <div>
              <Typography variant="caption">
                {album.isPrivate ? '@priv??' : null}
              </Typography>
            </div>
          )}
        </CardContent>
      </CardActionArea>
      <StyledCardActions
        bgcolor={
          album.isPrivate
            ? theme.palette.secondary.light
            : theme.palette.secondary.main
        }
      >
        {isAllowed ? (
          <Grid container>
            <Grid item container justifyContent="space-between">
              <Button
                size="small"
                color="primary"
                onClick={handleConfirmUpdate}
              >
                Modifier
              </Button>
              <Button
                size="small"
                color="primary"
                onClick={handleConfirmDelete}
              >
                Supprimer
              </Button>
            </Grid>
            <StyledCollapse in={showDeleteConfirm}>
              <CustomButton
                text="Je supprime"
                bgcolor={theme.palette.error.main}
                action="confirm"
                width="100%"
                onClick={handleDelete}
              />
            </StyledCollapse>
            <StyledCollapse in={showUpdateConfirm}>
              <CustomButton
                text="J'ins??re des photos"
                bgcolor={theme.palette.primary.main}
                action="confirm"
                width="100%"
                onClick={handleClick}
              />
              <CustomButton
                text="Je modifie l'album"
                bgcolor={theme.palette.warning.main}
                action="update"
                width="100%"
                onClick={handleUpdate}
              />
            </StyledCollapse>
          </Grid>
        ) : (
          <Button size="small" color="primary">
            {'REGARDER LES PHOTOS >>>'}
          </Button>
        )}
      </StyledCardActions>
    </StyledCard>
  )
}

AlbumCard.propTypes = {
  album: PropTypes.shape({
    id: PropTypes.string.isRequired,
    isPrivate: PropTypes.bool.isRequired,
    alias: PropTypes.string.isRequired,
    files: PropTypes.arrayOf(
      PropTypes.shape({
        filepath: PropTypes.string,
        filename: PropTypes.string,
      })
    ),
    description: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  setCurrentAlbum: PropTypes.func.isRequired,
  setFormAction: PropTypes.func.isRequired,
  setShow: PropTypes.func.isRequired,
  entityAlias: PropTypes.string.isRequired,
  isAllowed: PropTypes.bool.isRequired,
  queryKey: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default React.memo(AlbumCard)
