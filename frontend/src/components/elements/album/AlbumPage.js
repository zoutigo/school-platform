/* eslint-disable import/named */
/* eslint-disable arrow-body-style */
import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { Grid, styled, useTheme } from '@material-ui/core'
import AlbumPageList from './AlbumPageList'
import AlbumPageForm from './AlbumPageForm'

import CustomSimpleTooltip from '../CustomSimpleTooltip'
import CustomButton from '../CustomButton'
import Title from '../Title'
import redefineAlias from '../../../utils/redefineAlias'
import useRoutesInfos from '../../hooks/useRoutesInfos'
import albumProptypes from '../../../constants/proytypes/albumProptypes'

const StyledAlbumHeaderGrid = styled(Grid)(() => ({
  marginLeft: '0.5rem',
  // marginTop: '0.5rem',
  // height: '2rem',
}))

function AlbumPage({ currentAlbum, setShow, isAllowed, type, queryKey }) {
  const theme = useTheme()
  const [showPage, setShowPage] = useState({
    imagesForm: false,
    imagesList: true,
  })

  const { category } = useRoutesInfos()
  const categoryAlias = useCallback(
    redefineAlias(category.current.state.alias),
    [category]
  )
  // const queryKey = [`album-${currentAlbum.slug}`]
  const queryParams = `slug=${currentAlbum.slug}`

  const handleBack = useCallback(
    () =>
      setShow({
        page: false,
        list: true,
        form: false,
      }),
    []
  )

  return (
    <Grid item container style={{ marginTop: '0.5rem' }}>
      {type === 'album' && (
        <StyledAlbumHeaderGrid
          item
          container
          direction="row"
          alignItems="center"
        >
          <Grid item xs={4}>
            <CustomButton
              text="retour"
              bgcolor={theme.palette.primary.light}
              action="back"
              onClick={handleBack}
              width="100%"
            />
          </Grid>
          <Grid item xs={8} style={{ textAlign: 'center' }}>
            {currentAlbum && <Title title={currentAlbum.name} />}
          </Grid>
        </StyledAlbumHeaderGrid>
      )}

      {showPage.imagesList && (
        <AlbumPageList
          queryKey={queryKey}
          currentAlbum={currentAlbum}
          queryParams={queryParams}
          entityAlias={categoryAlias}
          isAllowed={isAllowed}
        />
      )}
      {showPage.imagesForm && (
        <AlbumPageForm
          entityAlias={categoryAlias}
          currentAlbum={currentAlbum}
          setShowPage={setShowPage}
          queryKey={queryKey}
        />
      )}
      {showPage.imagesForm && isAllowed && (
        <CustomSimpleTooltip
          title="Retour à la liste d'images"
          action="back"
          callback={() =>
            setShowPage({
              imagesForm: false,
              imagesList: true,
            })
          }
        />
      )}
      {showPage.imagesList && (
        <CustomSimpleTooltip
          title="Ajouter une image ?"
          action="add"
          callback={() =>
            setShowPage({
              imagesForm: true,
              imagesList: false,
            })
          }
        />
      )}
    </Grid>
  )
}

AlbumPage.defaultProps = {
  currentAlbum: null,
  setShow: null,
  isAllowed: false,
  type: 'album',
}

AlbumPage.propTypes = {
  currentAlbum: albumProptypes,
  setShow: PropTypes.func,
  isAllowed: PropTypes.bool,
  type: PropTypes.string,
  queryKey: PropTypes.string.isRequired,
}

export default AlbumPage
