import React from 'react'
import Paper from '../components/paper/Paper'
import { apiFetchPaper, apiPostPaper } from '../utils/api'
import { useRigths } from '../utils/hooks'
// eslint-disable-next-line import/no-named-as-default
import useRoles from '../utils/roles'

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
