import React from 'react'
import useRigths from '../components/hooks/useRigths'
import useRoles from '../components/hooks/useRoles'
import Paper from '../components/paper/Paper'
import { apiFetchPaper, apiPostPaper } from '../utils/api'

function VieScolaireCantineActivitesScreen() {
  const { moderatorLevel } = useRigths()
  const { apelMembre } = useRoles()

  const isAllowedToChange = moderatorLevel || apelMembre
  const paperType = 'activite'
  const paperFormat = 'html'
  const paperName = 'activite-cantine'
  const entityAlias = 'cantine'
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

export default VieScolaireCantineActivitesScreen
