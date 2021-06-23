import React from 'react'
import { apiFetchEvents, apiPostEvents } from '../utils/api'
import { useRigths } from '../utils/hooks'
import Paper from '../components/paper/Paper'

function VieScolaireCantineAgendaScreen() {
  const { moderatorLevel } = useRigths()
  const isAllowedToChange = moderatorLevel
  const paperType = 'event'
  const paperFormat = 'html'
  const entityAlias = 'cantine'
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

export default VieScolaireCantineAgendaScreen
