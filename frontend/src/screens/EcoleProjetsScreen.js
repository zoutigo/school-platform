import React from 'react'
import Page from '../components/page/Page'
import { StyledPageGrid } from '../components/elements/styled'
import useRigths from '../components/hooks/useRigths'

function EcoleProjetsScreen() {
  const pageName = 'projets'
  const slug = `ecole-projets`
  const queryKey = [pageName, `page-${slug}`]
  const queryParams = `slug=${slug}`

  const { moderatorLevel } = useRigths()
  const isAllowedToChange = moderatorLevel

  const pageParams = {
    slug,
    queryKey,
    queryParams,
    pageName,
    type: 'page',
    isAllowedToChange,
    initialFormState: false,
  }
  return (
    <StyledPageGrid container data-testid="ecole-projets-screen">
      <Page pageParams={pageParams} />
    </StyledPageGrid>
  )
}

export default EcoleProjetsScreen
