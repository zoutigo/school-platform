/* eslint-disable import/named */
import React from 'react'
import { apiFetchPaper, apiPostPaper } from '../utils/api'

import Paper from '../components/paper/Paper'
import useRigths from '../components/hooks/useRigths'

function InformationsActualitesInfoParentsScreen() {
  const { moderatorLevel } = useRigths()
  const paperType = 'parent-info'
  const paperFormat = 'html'
  const paperName = 'infos-parents'
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

export default InformationsActualitesInfoParentsScreen
