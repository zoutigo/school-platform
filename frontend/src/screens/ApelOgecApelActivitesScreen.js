import React from 'react'
import Paper from '../components/paper/Paper'
import { apiFetchPaper, apiPostPaper } from '../utils/api'
import { useRigths } from '../utils/hooks'
// eslint-disable-next-line import/no-named-as-default
// eslint-disable-next-line import/no-named-as-default-member
import useRoles from '../utils/roles'

function ApelOgecApelActivitesScreen() {
  const { moderatorLevel } = useRigths()
  const { apelMembre } = useRoles()

  const isAllowedToChange = moderatorLevel || apelMembre
  const paperType = 'activite'
  const paperFormat = 'html'
  const paperName = 'activite-apel'
  const entityAlias = 'apel'
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

export default ApelOgecApelActivitesScreen
