import React from 'react'
import Paper from '../components/paper/Paper'
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

export default ApelOgecApelActivitesScreen
