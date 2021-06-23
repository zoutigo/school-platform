import React from 'react'
import Paper from '../components/paper/Paper'
import { apiFetchPaper, apiPostPaper } from '../utils/api'
import { useRigths } from '../utils/hooks'

function VieScolaireCantineBrevesScreen() {
  const { moderatorLevel } = useRigths()

  const isAllowedToChange = moderatorLevel
  const paperType = 'breve'
  const paperFormat = 'pdf'
  const paperName = 'breve-hebdomadaire'
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

export default VieScolaireCantineBrevesScreen
