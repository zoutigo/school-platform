import { Grid } from '@material-ui/core'
import React, { useCallback, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useQuery } from 'react-query'
import { apiFecthEntity } from '../utils/api'

import { useRigths } from '../utils/hooks'
import ClassroomSummary from '../components/main/classes/ClassroomSummary'
import ApiAlert from '../components/elements/ApiAlert'
import useRoles from '../utils/roles'
import ClassroomForm from '../components/main/classes/ClassroomForm'
import AlertCollapse from '../components/elements/AlertCollapse'
import ToggleToolTip from '../components/elements/ToggleToolTip'

function ClassesPresentationScreen() {
  const { pathname } = useLocation()
  const [showClassroomForm, setShowClassroomForm] = useState(false)
  const [alert, setAlert] = useState({
    openAlert: false,
    severity: 'error',
    alertText: '',
  })

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

  const isAllowedToChange = moderatorLevel || defineRole(alias)
  const queryName = `classroom-${alias}`
  const queryParams = `alias=${alias}`
  const queryKey = [queryName]
  const { isLoading, isError, data, error } = useQuery(queryKey, () =>
    apiFecthEntity(queryParams)
  )

  if (isLoading) return <ApiAlert severity="warning">Chargement ...</ApiAlert>
  if (isError)
    return (
      <AlertCollapse
        severity="error"
        alertText={error.message}
        openAlert={isError}
      />
    )
  if (!Array.isArray(data)) return null

  const [result] = data

  return (
    <Grid container>
      <AlertCollapse
        severity={alert.severity}
        alertText={alert.alertText}
        openAlert={alert.openAlert}
      />

      {showClassroomForm && isAllowedToChange && (
        <ClassroomForm
          setShowClassroomForm={setShowClassroomForm}
          queryKey={queryKey}
          setAlert={setAlert}
          classroomData={result}
        />
      )}

      {!showClassroomForm && (
        <ClassroomSummary
          text={result?.summary}
          image={result?.image}
          alias={result?.alias}
          id={result._id || null}
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
