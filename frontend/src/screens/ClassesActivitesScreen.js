import { Grid } from '@material-ui/core'
import React from 'react'
import { useLocation } from 'react-router-dom'
import useRoles from '../utils/roles'
import { useRigths } from '../utils/hooks'
import Paper from '../components/paper/Paper'

function ClassesActivitesScreen() {
  const { pathname } = useLocation()
  const prealias = pathname.split('/')[2]

  const defineAlias = (extract) => {
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
  }

  const alias = defineAlias(prealias)

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

  const defineRole = (aliasName) => {
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
  }

  const isAllowedToChange = moderatorLevel || defineRole(alias)
  const paperType = 'activite'
  const paperFormat = 'html'
  const paperName = `activite-${alias}`
  const entityAlias = alias
  const queryKey = [paperName]
  const queryParams = `type=${paperType}&entityAlias=${entityAlias}`

  const paper = {
    queryKey,
    queryParams,
    paperName,
    paperFormat,
    paperType,
    entityAlias,
    isAllowedToChange,
  }

  return <Paper paper={paper} />
}

export default ClassesActivitesScreen
