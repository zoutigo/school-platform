import React from 'react'
import useRigths from '../components/hooks/useRigths'
import Paper from '../components/paper/Paper'
import { apiFetchPaper, apiPostPaper } from '../utils/api'

function InformationsActualitesActivitesScreen() {
  const { moderatorLevel } = useRigths()
  const paperType = 'activite'
  const paperFormat = 'html'
  const paperName = 'activite-ecole'
  const entityAlias = 'direction'
  const queryKey = [paperName]
  const queryParams = `type=${paperType}`
  const isAllowedToChange = moderatorLevel
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

export default InformationsActualitesActivitesScreen
