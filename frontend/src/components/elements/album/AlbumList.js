/* eslint-disable import/named */
import React, { useCallback } from 'react'
import { Grid } from '@material-ui/core'
import PropTypes from 'prop-types'
import CircularProgress from '@material-ui/core/CircularProgress'

import { apiFetchAlbum } from '../../../utils/api'
import AlbumCard from './AlbumCard'
import { useRigths } from '../../../utils/hooks'
import AlertMessage from '../AlertMessage'
import useFetch from '../../hooks/useFetch'

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
  const { isLoading, isError, data, errorMessage } = useFetch(
    queryKey,
    queryParams,
    apiFetchAlbum
  )

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
      {isError && <AlertMessage severity="error" message={errorMessage} />}
      {isLoading && <CircularProgress color="secondary" />}
      {filteredAlbums() &&
        filteredAlbums().map((album) => (
          <AlbumCard
            key={album.id}
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
