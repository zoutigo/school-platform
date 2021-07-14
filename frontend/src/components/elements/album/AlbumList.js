import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { useQuery } from 'react-query'
import { apiFetchAlbum } from '../../../utils/api'
import { setAlbumMutateAlert } from '../../../redux/alerts/AlertsActions'

function AlbumList({ queryKey, queryParams }) {
  const dispatch = useDispatch()
  const { isLoading, isError, data, error } = useQuery(queryKey, () =>
    apiFetchAlbum(queryParams)
  )

  useEffect(() => {
    if (isLoading) {
      dispatch(
        setAlbumMutateAlert({
          openAlert: true,
          severity: 'warning',
          alertText: 'Chargement des albums ...',
        })
      )
    }
    if (isError) {
      dispatch(
        setAlbumMutateAlert({
          openAlert: true,
          severity: 'error',
          alertText: error.response.data.message,
        })
      )
    }
    return () => {
      dispatch(
        setAlbumMutateAlert({
          openAlert: false,
          severity: 'error',
          alertText: '',
        })
      )
    }
  }, [isLoading, isError, data])

  return <div>album list</div>
}

AlbumList.defaultProps = {
  queryParams: '',
}

AlbumList.propTypes = {
  queryKey: PropTypes.arrayOf(PropTypes.string).isRequired,
  queryParams: PropTypes.string,
}

export default AlbumList
