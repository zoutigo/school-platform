import React, { useState } from 'react'
import { useMutation } from 'react-query'
import Proptypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '@material-ui/core'
// eslint-disable-next-line import/named
import { useUpdateMutationOptions } from '../../../utils/hooks'
import { setAlbumMutateAlert } from '../../../redux/alerts/AlertsActions'
import { apiPostAlbumImages } from '../../../utils/api'

function AlbumPageItem({ image, queryKey, entityAlias, albumId }) {
  const dispatch = useDispatch()
  const [showButton, setShowButton] = useState(false)
  const [showConfirmButton, setShowConfirmButton] = useState(false)
  const { URL_PREFIX } = useSelector((state) => state.settings)

  const handleClick = () => {
    setShowButton(!showButton)
    setShowConfirmButton(false)
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
      <div className="pic" onClick={handleClick} role="presentation">
        <img
          src={`${URL_PREFIX}/${image.filepath}`}
          alt={image.filename}
          key={image.filename}
          style={{ width: '100%' }}
        />
      </div>
      {showButton && (
        <Button
          style={{ width: '100%' }}
          onClick={() => setShowConfirmButton(true)}
        >
          Supprimer
        </Button>
      )}
      {showConfirmButton && (
        <Button style={{ width: '100%' }} onClick={mutateAlbum}>
          Confirmer la suppression
        </Button>
      )}
    </div>
  )
}
AlbumPageItem.defaultProps = {
  albumId: null,
}

AlbumPageItem.propTypes = {
  albumId: Proptypes.string,
  entityAlias: Proptypes.string.isRequired,
  queryKey: Proptypes.string.isRequired,
  image: Proptypes.shape({
    filename: Proptypes.string.isRequired,
    filepath: Proptypes.string.isRequired,
  }).isRequired,
}

export default AlbumPageItem
