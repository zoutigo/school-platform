import React from 'react'
import { apiFetchPaper, apiPostPaper } from '../utils/api'
import Paper from '../components/paper/Paper'
import useRigths from '../components/hooks/useRigths'
import useRoles from '../components/hooks/useRoles'

function ApelOgecOgecAgendaScreen() {
  const { ogecMembre } = useRoles()
  const { moderatorLevel } = useRigths()
  const isAllowedToChange = moderatorLevel || ogecMembre
  const paperType = 'event'
  const paperFormat = 'html'
  const entityAlias = 'ogec'
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

export default ApelOgecOgecAgendaScreen
