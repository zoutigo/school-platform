import React, { useState } from 'react'
import { useSnackbar } from 'notistack'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { Button, styled } from '@material-ui/core'
// eslint-disable-next-line import/named
import { apiPostAlbumImages } from '../../../utils/api'
import useMutate from '../../hooks/useMutate'
import MutateCircularProgress from '../MutateCircularProgress'
import getError from '../../../utils/getError'
import getResponse from '../../../utils/getResponse'
import fileProptypes from '../../../constants/proytypes/fileProptypes'

const StyledDeleteButton = styled(Button)(({ theme }) => ({
  background: theme.palette.warning.main,
  width: '100%',
}))
const StyledConfirmDeleteButton = styled(Button)(({ theme }) => ({
  background: theme.palette.error.main,
  width: '100%',
}))

function AlbumPageItem({ image, queryKey, entityAlias, albumUuid, isAllowed }) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const [showButton, setShowButton] = useState(false)
  const [showImage, setShowImage] = useState(true)
  const [showConfirmButton, setShowConfirmButton] = useState(false)
  const { URL_PREFIX } = useSelector((state) => state.settings)

  const handleClick = () => {
    if (isAllowed) {
      setShowButton(!showButton)
      setShowConfirmButton(false)
    }
  }

  const { Token } = useSelector((state) => state.user)
  useSelector((state) => state.settings)

  const { mutateAsync, isMutating } = useMutate(queryKey, apiPostAlbumImages)

  const mutateAlbum = async () => {
    closeSnackbar()
    try {
      await mutateAsync({
        uuid: albumUuid,
        entityAlias: entityAlias,
        action: 'delete',
        Token: Token,
        filepath: image.filepath,
      }).then((response) => {
        enqueueSnackbar(getResponse(response), { variant: 'success' })
        setShowImage(false)
        setShowButton(false)
        setShowConfirmButton(false)
      })
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: 'error' })
      setShowButton(false)
      setShowConfirmButton(false)
    }
  }

  return (
    <div className="pics">
      {isMutating && <MutateCircularProgress />}
      {showImage && (
        <div className="pic">
          <img
            src={`${URL_PREFIX}/${image.filepath.replace(/:/gi, '')}`}
            alt={image.filename}
            key={image.filename}
            style={{ width: '100%' }}
            onClick={handleClick}
            role="presentation"
          />
          {showButton && (
            <StyledDeleteButton
              onClick={() => {
                setShowConfirmButton(!showConfirmButton)
              }}
            >
              Supprimer
            </StyledDeleteButton>
          )}
          {showConfirmButton && (
            <StyledConfirmDeleteButton onClick={mutateAlbum}>
              Confirmer la suppression
            </StyledConfirmDeleteButton>
          )}
        </div>
      )}
    </div>
  )
}
AlbumPageItem.defaultProps = {
  albumUuid: null,
}

AlbumPageItem.propTypes = {
  isAllowed: PropTypes.bool.isRequired,
  albumUuid: PropTypes.string,
  entityAlias: PropTypes.string.isRequired,
  queryKey: PropTypes.arrayOf(PropTypes.string).isRequired,
  image: fileProptypes.isRequired,
}

export default AlbumPageItem
