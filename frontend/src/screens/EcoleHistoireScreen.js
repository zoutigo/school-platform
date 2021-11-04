import React from 'react'
import Page from '../components/page/Page'
import { StyledPageGrid } from '../components/elements/styled'
import useRigths from '../components/hooks/useRigths'

function EcoleHistoireScreen() {
  const pageName = 'histoire'
  const alias = `ecole-histoire`
  const queryKey = [pageName, `page-${alias}`]
  const queryParams = `alias=${alias}`

  const { moderatorLevel } = useRigths()
  const isAllowedToChange = moderatorLevel

  const pageParams = {
    alias,
    queryKey,
    queryParams,
    pageName,
    isAllowedToChange,
    type: 'page',
    initialFormState: false,
  }

  return (
    <StyledPageGrid container data-testid="ecole-histoire-screen">
      <Page pageParams={pageParams} />
    </StyledPageGrid>
  )
}

export default EcoleHistoireScreen
