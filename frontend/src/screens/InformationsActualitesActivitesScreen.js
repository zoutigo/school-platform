import React from 'react'
import Paper from '../components/paper/Paper'
import { useRigths } from '../utils/hooks'

function InformationsActualitesActivitesScreen() {
  const { moderatorLevel } = useRigths()

  const paperType = 'activite'
  const paperFormat = 'html'
  const paperName = 'activite-ecole'
  const entityAlias = 'direction'
  const queryKey = [paperName]
  const queryParams = `type=${paperType}`
  const isAllowedToChange = moderatorLevel

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

export default InformationsActualitesActivitesScreen
