/* eslint-disable import/named */
import React, { useCallback } from 'react'
import { Grid } from '@material-ui/core'
import PropTypes from 'prop-types'
import { useQuery } from 'react-query'
import { apiFetchAlbum } from '../../../utils/api'
import { setAlbumFetchAlert } from '../../../redux/alerts/AlertsActions'
import AlbumCard from './AlbumCard'
import useFetchDispatch from '../useFetchDispatch'
import { useRigths } from '../../../utils/hooks'

function AlbumList({
  queryKey,
  queryParams,
  setCurrentAlbum,
  setFormAction,
  setShow,
  isAllowed,
  entityAlias,
}) {
  const { userLevel } = useRigths()
  const { isLoading, isError, data, error } = useQuery(queryKey, () =>
    apiFetchAlbum(queryParams)
  )

  useFetchDispatch(isLoading, isError, error, data, setAlbumFetchAlert)

  const filteredAlbums = useCallback(() => {
    if (!data || !Array.isArray(data)) return null
    if (userLevel) {
      return data
    }
    const result = data.filter((pack) => pack.isPrivate !== true)
    return result
  }, [data, userLevel])

  return (
    <Grid item container>
      {filteredAlbums() &&
        filteredAlbums().map((album) => (
          <AlbumCard
            key={album._id}
            album={album}
            setCurrentAlbum={setCurrentAlbum}
            setFormAction={setFormAction}
            setShow={setShow}
            isAllowed={isAllowed}
            entityAlias={entityAlias}
            queryKey={queryKey}
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
  setFormAction: PropTypes.func.isRequired,
  setShow: PropTypes.func.isRequired,
  isAllowed: PropTypes.bool.isRequired,
}

export default React.memo(AlbumList)
