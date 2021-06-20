import { Grid } from '@material-ui/core'
import React from 'react'
import Paper from '../components/paper/Paper'
import { useRigths } from '../utils/hooks'
import useRoles from '../utils/roles'

function ApelOgecOgecActivitesScreen() {
  const { moderatorLevel } = useRigths()
  const { ogecMembre } = useRoles()

  const isAllowedToChange = moderatorLevel || ogecMembre
  const paperType = 'activite'
  const paperFormat = 'html'
  const paperName = 'activite-ogec'
  const entityAlias = 'ogec'
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

export default ApelOgecOgecActivitesScreen
