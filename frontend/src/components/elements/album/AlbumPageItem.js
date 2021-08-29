import React, { useState } from 'react'
import { useMutation } from 'react-query'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { Button, styled } from '@material-ui/core'
// eslint-disable-next-line import/named
import { useUpdateMutationOptions } from '../../../utils/hooks'
import { setAlbumMutateAlert } from '../../../redux/alerts/AlertsActions'
import { apiPostAlbumImages } from '../../../utils/api'

const StyledDeleteButton = styled(Button)(({ theme }) => ({
  background: theme.palette.warning.main,
  width: '100%',
}))
const StyledConfirmDeleteButton = styled(Button)(({ theme }) => ({
  background: theme.palette.error.main,
  width: '100%',
}))

function AlbumPageItem({ image, queryKey, entityAlias, albumId, isAllowed }) {
  const dispatch = useDispatch()
  const [showButton, setShowButton] = useState(false)
  const [showImage, setShowImage] = useState(true)
  const [showConfirmButton, setShowConfirmButton] = useState(false)
  const { URL_PREFIX } = useSelector((state) => state.settings)

  const handleClick = () => {
    console.log('albumId:', albumId)
    if (isAllowed) {
      setShowButton(!showButton)
      setShowConfirmButton(false)
    }
  }

  const { Token } = useSelector((state) => state.user)
  useSelector((state) => state.settings)

  const { mutateAsync } = useMutation(
    apiPostAlbumImages,
    useUpdateMutationOptions(queryKey)
  )

  const mutateAlbum = async () => {
    try {
      await mutateAsync({
        id: albumId,
        entityAlias: entityAlias,
        action: 'delete',
        Token: Token,
        filepath: image.filepath,
      }).then((response) => {
        dispatch(
          setAlbumMutateAlert({
            openAlert: true,
            severity: 'success',
            alertText: response.message,
          })
        )
        setShowImage(false)
        setShowButton(false)
        setShowConfirmButton(false)
      })
    } catch (err) {
      dispatch(
        setAlbumMutateAlert({
          openAlert: true,
          severity: 'error',
          alertText: err.message,
        })
      )
      setShowButton(false)
      setShowConfirmButton(false)
    }
  }

  return (
    <div className="pics">
      {showImage && (
        <div className="pic">
          <img
            src={`${URL_PREFIX}/${image.filepath}`}
            alt={image.filename}
            key={image.filename}
            style={{ width: '100%' }}
            onClick={handleClick}
            role="presentation"
          />
          {showButton && (
            <StyledDeleteButton
              onClick={() => {
                console.log('albumId:', albumId)
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
  albumId: null,
}

AlbumPageItem.propTypes = {
  isAllowed: PropTypes.bool.isRequired,
  albumId: PropTypes.string,
  entityAlias: PropTypes.string.isRequired,
  queryKey: PropTypes.arrayOf(PropTypes.string).isRequired,
  image: PropTypes.shape({
    filename: PropTypes.string.isRequired,
    filepath: PropTypes.string.isRequired,
  }).isRequired,
}

export default AlbumPageItem
