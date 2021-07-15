/* eslint-disable import/named */
import { Grid } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAlbumMutateAlert } from '../../../redux/alerts/AlertsActions'
import { useRigths, useRouteDatas } from '../../../utils/hooks'
import AlertCollapse from '../AlertCollapse'
import AlbumForm from './AlbumForm'
import AlbumList from './AlbumList'
import AlbumPage from './AlbumPage'
import CustomSimpleTooltip from '../CustomSimpleTooltip'
import useRoles from '../../../utils/roles'

function Album() {
  const { current, categories, categoryAlias } = useRouteDatas()
  const dispatch = useDispatch()
  const { albumMutate, albumFetch } = useSelector((state) => state.alerts)
  const [currentAlbum, setCurrentAlbum] = useState('')
  const [formAction, setFormAction] = useState('create')

  const [show, setShow] = useState({
    page: false,
    list: true,
    form: false,
  })

  const {
    apelMembre,
    ogecMembre,
    psEnseignant,
    msEnseignant,
    gsEnseignant,
    cpEnseignant,
    ce1Enseignant,
    ce2Enseignant,
    cm1Enseignant,
    cm2Enseignant,
    adaptationEnseignant,
  } = useRoles()

  const queryKey = [current.path]
  const [category] = categories
  // const categoryAlias = () => {
  //   switch (category.alias) {
  //     case 'petite-section':
  //       return 'ps'
  //     case 'moyenne-section':
  //       return 'ms'
  //     case 'grande-section':
  //       return 'gs'

  //     default:
  //       return category.alias
  //   }
  // }

  const userIsAllowed = () => {
    switch (categoryAlias) {
      case 'ps':
        return psEnseignant
      case 'ms':
        return msEnseignant
      case 'gs':
        return gsEnseignant
      case 'cp':
        return cpEnseignant
      case 'ce1':
        return ce1Enseignant
      case 'ce2':
        return ce2Enseignant
      case 'cm1':
        return cm1Enseignant
      case 'cm2':
        return cm2Enseignant
      case 'adaptation':
        return adaptationEnseignant

      default:
        return false
    }
  }

  const { managerLevel, adminLevel, moderatorLevel } = useRigths()

  const isAllowed =
    managerLevel || adminLevel || moderatorLevel || userIsAllowed()

  const queryParams = `entityAlias=${categoryAlias}`

  useEffect(() => {
    const initialAlbumAlert = {
      severity: 'error',
      alertText: '',
      alertOpen: false,
    }
    return () => {
      dispatch(setAlbumMutateAlert(initialAlbumAlert))
      setCurrentAlbum('')
    }
  }, [])

  return (
    <Grid item container>
      <AlertCollapse {...albumMutate} />
      <AlertCollapse {...albumFetch} />
      {show.list && (
        <AlbumList
          queryKey={queryKey}
          setCurrentAlbum={setCurrentAlbum}
          entityAlias={categoryAlias}
          queryParams={queryParams}
          setShow={setShow}
          isAllowed={isAllowed}
        />
      )}

      {show.form && (
        <AlbumForm
          formAction={formAction}
          queryKey={queryKey}
          setFormAction={setFormAction}
          currentAlbum={currentAlbum}
          setCurrentAlbum={setCurrentAlbum}
          entityAlias={categoryAlias}
          setShow={setShow}
        />
      )}

      {show.page && (
        <AlbumPage
          currentAlbum={currentAlbum}
          setShow={setShow}
          entityAlias={categoryAlias}
        />
      )}
      {show.list && isAllowed && (
        <CustomSimpleTooltip
          title="Ajouter un album"
          action="add"
          callback={() =>
            setShow({
              page: false,
              list: false,
              form: true,
            })
          }
        />
      )}
      {show.form && isAllowed && (
        <CustomSimpleTooltip
          title="Retour à la liste"
          action="back"
          callback={() =>
            setShow({
              page: false,
              list: true,
              form: false,
            })
          }
        />
      )}
    </Grid>
  )
}

export default Album
