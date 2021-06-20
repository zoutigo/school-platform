import React from 'react'
import Paper from '../components/paper/Paper'
import { useRigths } from '../utils/hooks'

function InformationsActualitesNewsletterScreen() {
  const { moderatorLevel } = useRigths()

  const isAllowedToChange = moderatorLevel
  const paperType = 'newsletter'
  const paperFormat = 'pdf'
  const paperName = 'newletter-mensuelle'
  const entityAlias = 'direction'
  const queryKey = [paperName]
  const queryParams = `type=${paperType}&entityAlias=${entityAlias}`

  const paper = {
    queryKey,
    queryParams,
    paperName,
    paperFormat,
    paperType,
    entityAlias,
    isAllowedToChange,
  }
  return <Paper paper={paper} />
}

export default InformationsActualitesNewsletterScreen
