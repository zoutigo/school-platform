/* eslint-disable import/named */
import React from 'react'
import useRigths from '../components/hooks/useRigths'
import Paper from '../components/paper/Paper'
import { apiFetchPaper, apiPostPaper } from '../utils/api'

function InformationsFournituresScreen() {
  const { moderatorLevel } = useRigths()
  const isAllowedToChange = moderatorLevel
  const paperType = 'fourniture'
  const paperFormat = 'pdf'
  const paperName = 'informations-fournitures'
  const entityAlias = 'secretariat'
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

export default InformationsFournituresScreen
