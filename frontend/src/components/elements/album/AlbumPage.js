/* eslint-disable arrow-body-style */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useQuery } from 'react-query'
import PropTypes from 'prop-types'
import { Grid } from '@material-ui/core'
import AlbumPageList from './AlbumPageList'
import AlbumPageForm from './AlbumPageForm'
import AlertCollapse from '../AlertCollapse'
import CustomSimpleTooltip from '../CustomSimpleTooltip'
import {
  setAlbumFetchAlert,
  setAlbumPageFetchAlert,
  setAlbumPageMutateAlert,
} from '../../../redux/alerts/AlertsActions'
import { initialAlertCollapse } from '../../../constants/alerts'
import { useRouteDatas } from '../../../utils/hooks'
import { apiFetchAlbum } from '../../../utils/api'

function AlbumPage({ currentAlbum, setShow, isAllowed }) {
  const dispatch = useDispatch()
  const { categoryAlias } = useRouteDatas()
  const [album, setAlbum] = useState(currentAlbum)
  const [showPage, setShowPage] = useState({
    imagesForm: false,
    imagesList: true,
  })
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
      dispatch(
        setAlbumFetchAlert({
          openAlert: true,
          alertText: 'Chargement des images ...',
          severity: 'warning',
        })
      )
    }
    if (isError) {
      dispatch(
        setAlbumFetchAlert({
          openAlert: true,
          alertText: error.message,
          severity: 'error',
        })
      )
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
  return (
    <Grid item container>
      <h1>{album ? album.name : null}</h1>

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
          title="Ajouter une image"
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
}

AlbumPage.propTypes = {
  currentAlbum: PropTypes.shape({
    name: PropTypes.string,
    alias: PropTypes.string,
  }),
  setShow: PropTypes.func,
  isAllowed: PropTypes.bool,
}

export default AlbumPage
