/* eslint-disable import/named */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import React, { useCallback } from 'react'
import Paper from '../components/paper/Paper'
import { apiFetchPaper, apiPostPaper } from '../utils/api'
import redefineAlias from '../utils/redefineAlias'
import useRigths from '../components/hooks/useRigths'
import useRoles from '../components/hooks/useRoles'
import useRoutesInfos from '../components/hooks/useRoutesInfos'

function ClassesActivitesScreen() {
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
  const paperType = 'activite'
  const paperFormat = 'html'
  const paperName = `activite-${alias}`
  const entityAlias = alias
  const queryKey = [paperName]
  const queryParams = `type=${paperType}&entityAlias=${entityAlias}`
  const fetcher = apiFetchPaper
  const poster = apiPostPaper

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

export default React.memo(ClassesActivitesScreen)
