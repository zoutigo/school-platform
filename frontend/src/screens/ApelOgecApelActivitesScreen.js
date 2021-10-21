/* eslint-disable import/no-named-as-default */
/* eslint-disable import/named */
import React from 'react'
import useRigths from '../components/hooks/useRigths'
import useRoles from '../components/hooks/useRoles'
import Paper from '../components/paper/Paper'
import { apiFetchPaper, apiPostPaper } from '../utils/api'

// eslint-disable-next-line import/no-named-as-default
// eslint-disable-next-line import/no-named-as-default-member

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
