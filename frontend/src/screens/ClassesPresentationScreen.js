/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/named */
/* eslint-disable arrow-body-style */
import { Grid } from '@material-ui/core'
import React, { useCallback, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import ClassroomSummary from '../components/main/classes/ClassroomSummary'
import ClassroomForm from '../components/main/classes/ClassroomForm'
import AlertCollapse from '../components/elements/AlertCollapse'
import ToggleToolTip from '../components/elements/ToggleToolTip'
import { setFetchAlert, setMutateAlert } from '../redux/alerts/AlertsActions'
import { initialAlertCollapse } from '../constants/alerts'
import useRigths from '../components/hooks/useRigths'
import useRoles from '../components/hooks/useRoles'

function ClassesPresentationScreen() {
  const dispatch = useDispatch()
  const { pathname } = useLocation()
  const [currentClassroom, setCurrentClassroom] = useState(null)
  const [showClassroomForm, setShowClassroomForm] = useState(false)

  const { mutate, fetch } = useSelector((state) => state.alerts)

  const defineAlias = useCallback((extract) => {
    switch (extract) {
      case 'petite-section':
        return 'ps'
      case 'moyenne-section':
        return 'ms'
      case 'grande-section':
        return 'gs'

      default:
        return extract
    }
  }, [])

  const alias = defineAlias(pathname.split('/')[2])

  const { moderatorLevel } = useRigths()
  const {
    psEnseignant,
    msEnseignant,
    gsEnseignant,
    cpEnseignant,
    ce1Enseignant,
    ce2Enseignant,
    cm1Enseignant,
    cm2Enseignant,
    adaptation,
  } = useRoles()

  const defineRole = useCallback((aliasName) => {
    switch (aliasName) {
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
        return adaptation

      default:
        return false
    }
  }, [])

  const clearFetch = useCallback(() => {
    dispatch(setFetchAlert(initialAlertCollapse))
  }, [])
  const clearMutate = useCallback(() => {
    dispatch(setMutateAlert(initialAlertCollapse))
  }, [])

  useEffect(() => {
    return () => {
      // clearMutate()
      // clearFetch()
      setCurrentClassroom(null)
    }
  }, [])

  const isAllowedToChange = moderatorLevel || defineRole(alias)
  const queryName = `classroom-${alias}`
  const queryParams = `alias=${alias}`
  const queryKey = [queryName]

  return (
    <Grid container>
      <AlertCollapse {...fetch} callback={clearFetch} />
      <AlertCollapse {...mutate} callback={clearMutate} />

      {showClassroomForm && isAllowedToChange && (
        <ClassroomForm
          setShowClassroomForm={setShowClassroomForm}
          setCurrentClassroom={setCurrentClassroom}
          currentClassroom={currentClassroom}
          queryKey={queryKey}
        />
      )}

      {!showClassroomForm && (
        <ClassroomSummary
          queryParams={queryParams}
          queryKey={queryKey}
          setCurrentClassroom={setCurrentClassroom}
          currentClassroom={currentClassroom}
        />
      )}
      {isAllowedToChange && (
        <ToggleToolTip
          init={!showClassroomForm}
          toggleValue={showClassroomForm}
          staticText="Modifier la page"
          activeText="Retour à la presentation"
          action="update"
          callback={setShowClassroomForm}
        />
      )}
    </Grid>
  )
}

export default React.memo(ClassesPresentationScreen)
