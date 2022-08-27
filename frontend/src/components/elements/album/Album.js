/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/named */
import { Grid } from '@material-ui/core'
import React, { useCallback, useEffect, useState } from 'react'

import AlbumForm from './AlbumForm'
import AlbumList from './AlbumList'
import AlbumPage from './AlbumPage'
import CustomSimpleTooltip from '../CustomSimpleTooltip'

import redefineAlias from '../../../utils/redefineAlias'
import useRigths from '../../hooks/useRigths'
import useRoutesInfos from '../../hooks/useRoutesInfos'
import useRoles from '../../hooks/useRoles'

function Album() {
  const { current, category } = useRoutesInfos()

  const [currentAlbum, setCurrentAlbum] = useState('')
  const [formAction, setFormAction] = useState('create')

  const [show, setShow] = useState({
    page: false,
    list: true,
    form: false,
  })
  const categoryAlias = useCallback(
    redefineAlias(category.current.state.alias),
    [category.current.state]
  )

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

  const userIsAllowed = useCallback(() => {
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
      case 'apel':
        return apelMembre
      case 'ogec':
        return ogecMembre

      default:
        return false
    }
  }, [useRoles()])

  const { managerLevel, adminLevel, moderatorLevel } = useRigths()

  const isAllowed =
    managerLevel || adminLevel || moderatorLevel || userIsAllowed()

  const queryParams = `entityAlias=${categoryAlias}`

  // eslint-disable-next-line arrow-body-style
  useEffect(() => {
    return () => {
      setCurrentAlbum('')
    }
  }, [])

  const handleAdd = useCallback(
    () =>
      setShow({
        page: false,
        list: false,
        form: true,
      }),
    []
  )
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
    <Grid item container>
      {show.list && (
        <AlbumList
          queryKey={queryKey}
          setCurrentAlbum={setCurrentAlbum}
          setFormAction={setFormAction}
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
          isAllowed={isAllowed}
          queryKey={queryKey}
        />
      )}
      {show.list && isAllowed && (
        <CustomSimpleTooltip
          title="Ajouter un album"
          action="add"
          callback={handleAdd}
        />
      )}
      {show.form && isAllowed && (
        <CustomSimpleTooltip
          title="Retour à la liste"
          action="back"
          callback={handleBack}
        />
      )}
    </Grid>
  )
}

export default Album
