import React from 'react'
import { apiFetchPaper, apiPostPaper } from '../utils/api'

import Paper from '../components/paper/Paper'
import useRigths from '../components/hooks/useRigths'

function InformationsActualitesAgendaScreen() {
  const { moderatorLevel } = useRigths()
  const isAllowedToChange = moderatorLevel
  const paperType = 'event'
  const paperFormat = 'html'
  const entityAlias = ''
  const paperName = `Agenda ${entityAlias}`
  const queryKey = [paperName]
  const queryParams = `entityAlias=${entityAlias}&type=event`
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

export default InformationsActualitesAgendaScreen
