import React from 'react'
import Page from '../components/page/Page'
import { StyledPageGrid } from '../components/elements/styled'
import useRigths from '../components/hooks/useRigths'

function EcoleHistoireScreen() {
  const pageName = 'histoire'
  const slug = `ecole-histoire`
  const queryKey = [pageName, `page-${slug}`]
  const queryParams = `slug=${slug}`

  const { moderatorLevel } = useRigths()
  const isAllowedToChange = moderatorLevel

  const pageParams = {
    slug,
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
