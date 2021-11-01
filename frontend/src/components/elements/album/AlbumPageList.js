import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { styled } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'
import AlbumPageItem from './AlbumPageItem'
import useFetch from '../../hooks/useFetch'
import { apiFetchAlbum } from '../../../utils/api'
import AlertMessage from '../AlertMessage'

const StyledDiv = styled('div')(({ theme }) => ({
  WebkitColumnCount: 3,
  MozColumnCount: 3,
  columnCount: 3,
  [theme.breakpoints.down('xs')]: {
    WebkitColumnCount: 1,
    MozColumnCount: 1,
    columnCount: 1,
    WebkitColumnWidth: '100%',
    MozColumnWidth: '100%',
    columnWidth: '100%',
  },
  [theme.breakpoints.between('sm', 'md')]: {
    WebkitColumnCount: 2,
    MozColumnCount: 2,
    columnCount: 2,
  },
  WebkitColumnWidth: '33%',
  MozColumnWidth: '33%',
  columnWidth: '33%',
  padding: '0 12px',
  '& .pics': {
    WebkitTransition: 'all 350ms ease',
    transition: 'all 350ms ease',

    marginBottom: '12px',
    '&:hover': {
      filter: 'opacity(0.8)',
    },
    '& .pic': {
      cursor: 'pointer',
    },
  },
}))

function AlbumPageList({
  queryKey,
  currentAlbum,
  queryParams,
  entityAlias,
  isAllowed,
}) {
  const { isLoading, isError, data, errorMessage } = useFetch(
    queryKey,
    queryParams,
    apiFetchAlbum
  )

  useEffect(() => {
    if (data && data[0] && data[0].files && Array.isArray(data[0].files)) {
      console.log(data)
      console.log(data[0].files.length)
    }
  }, [data])

  return (
    <StyledDiv container>
      {isError && <AlertMessage severity="error" message={errorMessage} />}
      {isLoading && <CircularProgress color="secondary" />}
      {data &&
        data[0] &&
        data[0].files &&
        Array.isArray(data[0].files) &&
        data[0].files.map((image) => (
          <AlbumPageItem
            key={image.filepath}
            isAllowed={isAllowed}
            image={image}
            queryKey={queryKey}
            entityAlias={entityAlias}
            albumId={currentAlbum ? currentAlbum.id : null}
          />
        ))}
    </StyledDiv>
  )
}

AlbumPageList.defaultProps = {
  currentAlbum: null,
}

AlbumPageList.propTypes = {
  isAllowed: PropTypes.bool.isRequired,
  entityAlias: PropTypes.string.isRequired,
  queryParams: PropTypes.string.isRequired,
  queryKey: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentAlbum: PropTypes.shape({
    id: PropTypes.string,
    files: PropTypes.arrayOf(
      PropTypes.shape({
        filename: PropTypes.string,
        filepath: PropTypes.string,
      })
    ),
  }),
}
export default React.memo(AlbumPageList)
