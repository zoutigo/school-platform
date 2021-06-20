import React from 'react'
import Paper from '../components/paper/Paper'
import { useRigths } from '../utils/hooks'

function VieScolaireCantineMenusScreen() {
  const { moderatorLevel } = useRigths()

  const isAllowedToChange = moderatorLevel
  const paperType = 'menu'
  const paperFormat = 'pdf'
  const paperName = 'menu-hebdomadaire'
  const entityAlias = 'cantine'
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

export default VieScolaireCantineMenusScreen
