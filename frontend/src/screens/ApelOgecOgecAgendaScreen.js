import React from 'react'
import { apiFetchEvents, apiPostEvents } from '../utils/api'
import { useRigths } from '../utils/hooks'
import Paper from '../components/paper/Paper'
import useRoles from '../utils/roles'

function ApelOgecOgecAgendaScreen() {
  const { ogecMembre } = useRoles()
  const { moderatorLevel } = useRigths()
  const isAllowedToChange = moderatorLevel || ogecMembre
  const paperType = 'event'
  const paperFormat = 'html'
  const entityAlias = 'ogec'
  const paperName = `Agenda ${entityAlias}`
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

export default ApelOgecOgecAgendaScreen
