import React, { useEffect, useState } from 'react'

import PropTypes from 'prop-types'
import { styled } from '@material-ui/core'

import AlbumPageItem from './AlbumPageItem'

const StyledGrid = styled('div')(({ theme }) => ({
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
  const [images, setImages] = useState([])

  useEffect(() => {
    setImages(currentAlbum ? currentAlbum.files : null)
    return () => {
      setImages([])
    }
  }, [])

  return (
    <StyledGrid>
      {images &&
        images.map((image) => (
          <AlbumPageItem
            key={image.filepath}
            isAllowed={isAllowed}
            image={image}
            queryKey={queryKey}
            entityAlias={entityAlias}
            albumId={currentAlbum ? currentAlbum.id : null}
          />
        ))}
    </StyledGrid>
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
