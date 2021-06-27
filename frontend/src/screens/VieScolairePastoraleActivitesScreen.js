import React from 'react'
import Paper from '../components/paper/Paper'
import { apiFetchPaper, apiPostPaper } from '../utils/api'
import { useRigths } from '../utils/hooks'
import useRoles from '../utils/roles'

function VieScolairePastoraleActivitesScreen() {
  const { moderatorLevel } = useRigths()
  const { catechiste } = useRoles()

  const isAllowedToChange = moderatorLevel || catechiste
  const paperType = 'activite'
  const paperFormat = 'html'
  const paperName = 'activite-pastorale'
  const entityAlias = 'pastorale'
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

export default VieScolairePastoraleActivitesScreen
