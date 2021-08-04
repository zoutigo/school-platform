/* eslint-disable import/named */
/* eslint-disable arrow-body-style */
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useQuery } from 'react-query'
import PropTypes from 'prop-types'
import { Grid, styled, useTheme } from '@material-ui/core'
import AlbumPageList from './AlbumPageList'
import AlbumPageForm from './AlbumPageForm'
import AlertCollapse from '../AlertCollapse'
import CustomSimpleTooltip from '../CustomSimpleTooltip'
import {
  setAlbumFetchAlert,
  setAlbumPageFetchAlert,
  setAlbumPageMutateAlert,
} from '../../../redux/alerts/AlertsActions'
import {
  errorAlertCollapse,
  initialAlertCollapse,
  loadingAlertCollapse,
} from '../../../constants/alerts'
import { useRoutesInfos } from '../../../utils/hooks'
import { apiFetchAlbum } from '../../../utils/api'
import CustomButton from '../CustomButton'
import Title from '../Title'
import redefineAlias from '../../../utils/redefineAlias'

const StyledAlbumHeaderGrid = styled(Grid)(() => ({
  marginLeft: '0.5rem',
  // marginTop: '0.5rem',
  // height: '2rem',
}))

function AlbumPage({ currentAlbum, setShow, isAllowed, type }) {
  const dispatch = useDispatch()
  const theme = useTheme()

  const [album, setAlbum] = useState(currentAlbum)
  const [showPage, setShowPage] = useState({
    imagesForm: false,
    imagesList: true,
  })

  const { category } = useRoutesInfos()
  const categoryAlias = useCallback(
    redefineAlias(category.current.state.alias),
    [category]
  )
  const queryKey = [`album-${currentAlbum.alias}`]
  const queryParams = `alias=${currentAlbum.alias}`

  const { albumPageMutate, albumPageFetch } = useSelector(
    (state) => state.alerts
  )

  const { isLoading, isError, data, error } = useQuery(queryKey, () =>
    apiFetchAlbum(queryParams)
  )

  useEffect(() => {
    if (isLoading) {
      dispatch(setAlbumFetchAlert(loadingAlertCollapse))
    }
    if (isError) {
      dispatch(setAlbumFetchAlert(errorAlertCollapse(error.message)))
    }
    if (data) {
      setAlbum(data[0])
      dispatch(setAlbumFetchAlert({ initialAlertCollapse }))
    }
    return () => {
      dispatch(setAlbumPageMutateAlert(initialAlertCollapse))
      dispatch(setAlbumPageFetchAlert(initialAlertCollapse))
    }
  }, [isLoading, isError, data, album])

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
            {album && <Title title={album.name} />}
          </Grid>
        </StyledAlbumHeaderGrid>
      )}

      <AlertCollapse
        {...albumPageMutate}
        callback={() => dispatch(setAlbumPageMutateAlert(initialAlertCollapse))}
      />
      <AlertCollapse
        {...albumPageFetch}
        callback={() => dispatch(setAlbumPageFetchAlert(initialAlertCollapse))}
      />
      {showPage.imagesList && (
        <AlbumPageList
          queryKey={queryKey}
          currentAlbum={album}
          queryParams={queryParams}
          entityAlias={categoryAlias}
          isAllowed={isAllowed}
        />
      )}
      {showPage.imagesForm && (
        <AlbumPageForm
          entityAlias={categoryAlias}
          currentAlbum={album}
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
  currentAlbum: PropTypes.shape({
    name: PropTypes.string,
    alias: PropTypes.string,
  }),
  setShow: PropTypes.func,
  isAllowed: PropTypes.bool,
  type: PropTypes.string,
}

export default AlbumPage
