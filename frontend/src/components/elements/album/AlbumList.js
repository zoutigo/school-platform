import React, { useEffect } from 'react'
import { Grid } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { useQuery } from 'react-query'
import { apiFetchAlbum } from '../../../utils/api'
import { setAlbumFetchAlert } from '../../../redux/alerts/AlertsActions'
import AlbumCard from './AlbumCard'
import {
  errorAlertCollapse,
  initialAlertCollapse,
  loadingAlertCollapse,
} from '../../../constants/alerts'

function AlbumList({
  queryKey,
  queryParams,
  setCurrentAlbum,
  setShow,
  isAllowed,
  entityAlias,
}) {
  const dispatch = useDispatch()

  const { isLoading, isError, data, error } = useQuery(queryKey, () =>
    apiFetchAlbum(queryParams)
  )

  useEffect(() => {
    if (isLoading) {
      dispatch(setAlbumFetchAlert(loadingAlertCollapse))
    }
    if (isError) {
      dispatch(
        setAlbumFetchAlert(errorAlertCollapse(error.response.data.message))
      )
    }
    if (data && Array.isArray(data)) {
      dispatch(setAlbumFetchAlert(initialAlertCollapse))
    }

    return () => {
      dispatch(setAlbumFetchAlert(initialAlertCollapse))
    }
  }, [isLoading, isError, data])

  return (
    <Grid item container>
      {data &&
        Array.isArray(data) &&
        data.length > 0 &&
        data.map((album) => (
          <AlbumCard
            key={album._id}
            album={album}
            setCurrentAlbum={setCurrentAlbum}
            setShow={setShow}
            isAllowed={isAllowed}
            entityAlias={entityAlias}
          />
        ))}
    </Grid>
  )
}

AlbumList.defaultProps = {
  queryParams: '',
}

AlbumList.propTypes = {
  queryKey: PropTypes.arrayOf(PropTypes.string).isRequired,
  queryParams: PropTypes.string,
  entityAlias: PropTypes.string.isRequired,
  setCurrentAlbum: PropTypes.func.isRequired,
  setShow: PropTypes.func.isRequired,
  isAllowed: PropTypes.bool.isRequired,
}

export default AlbumList
