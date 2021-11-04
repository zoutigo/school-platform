import React from 'react'
import Page from '../components/page/Page'
import { StyledPageGrid } from '../components/elements/styled'
import useRigths from '../components/hooks/useRigths'

function EcoleProjetsPastoralScreen() {
  const pageName = 'projet pastoral'
  const alias = `ecole-projets-pastoral`
  const queryKey = [pageName, `page-${alias}`]
  const queryParams = `alias=${alias}`

  const { moderatorLevel } = useRigths()
  const isAllowedToChange = moderatorLevel

  const pageParams = {
    isAllowedToChange,
    alias,
    queryKey,
    queryParams,
    pageName,
    type: 'page',
    initialFormState: false,
  }

  return (
    <StyledPageGrid container data-testid="ecole-projets-pastoral-screen">
      <Page pageParams={pageParams} />
    </StyledPageGrid>
  )
}

export default EcoleProjetsPastoralScreen
