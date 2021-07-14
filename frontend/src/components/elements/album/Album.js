/* eslint-disable import/named */
import { Grid } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAlbumMutateAlert } from '../../../redux/alerts/AlertsActions'
import { useRouteDatas } from '../../../utils/hooks'
import AlertCollapse from '../AlertCollapse'
import ToggleToolTip from '../ToggleToolTip'
import AlbumForm from './AlbumForm'
import AlbumList from './AlbumList'

function Album() {
  const { current } = useRouteDatas()
  const dispatch = useDispatch()
  const { albumMutate } = useSelector((state) => state.alerts)
  const [showAlbumForm, setShowAlbumForm] = useState(false)
  const [album, setAlbum] = useState('')
  const [formAction, setFormAction] = useState('create')

  const queryKey = [current.path]
  useEffect(() => {
    const initialAlbumAlert = {
      severity: 'error',
      alertText: '',
      alertOpen: false,
    }
    return () => {
      dispatch(setAlbumMutateAlert(initialAlbumAlert))
      setAlbum('')
    }
  }, [])

  return (
    <Grid item container>
      <AlertCollapse {...albumMutate} />
      {!showAlbumForm ? (
        <AlbumList queryKey={queryKey} setAlbum={setAlbum} />
      ) : (
        <AlbumForm
          formAction={formAction}
          queryKey={queryKey}
          setFormAction={setFormAction}
          album={album}
          setAlbum={setAlbum}
        />
      )}
      <ToggleToolTip
        staticText="Créer un album"
        activeText="revenir à la liste des albums"
        toggleValue={showAlbumForm}
        callback={setShowAlbumForm}
        action="add"
        init
      />
    </Grid>
  )
}

export default Album
