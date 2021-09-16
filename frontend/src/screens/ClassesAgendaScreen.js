import React, { useCallback } from 'react'
import Paper from '../components/paper/Paper'
import { apiFetchEvents, apiPostEvents } from '../utils/api'
import { useRigths, useRoutesInfos } from '../utils/hooks'
import redefineAlias from '../utils/redefineAlias'
import useRoles from '../utils/roles'

function ClassesAgendaScreen() {
  const { category } = useRoutesInfos()
  const alias = useCallback(redefineAlias(category.current.state.alias), [
    category,
  ])

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

      default:
        return false
    }
  }, [])

  const isAllowedToChange = moderatorLevel || defineRole(alias)
  const paperType = 'event'
  const paperFormat = 'html'
  const entityAlias = alias
  const paperName = `Agenda - ${alias}`
  const queryKey = [paperName]
  const queryParams = `entityAlias=${entityAlias}`
  const fetcher = apiFetchEvents
  const poster = apiPostEvents

  const paper = {
    queryKey,
    queryParams,
    paperName,
    paperFormat,
    paperType,
    entityAlias,
    isAllowedToChange,
    fetcher,
    poster,
  }

  return <Paper paper={paper} />
}

export default ClassesAgendaScreen
