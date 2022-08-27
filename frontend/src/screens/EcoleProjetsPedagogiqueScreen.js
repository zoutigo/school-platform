import React from 'react'
import Page from '../components/page/Page'
import { StyledPageGrid } from '../components/elements/styled'
import useRigths from '../components/hooks/useRigths'

function EcoleProjetsPedagogiqueScreen() {
  const pageName = 'projet pedagogique'
  const slug = `ecole-projets-pedagogique`
  const queryKey = [pageName, `page-${slug}`]
  const queryParams = `slug=${slug}`

  const { moderatorLevel } = useRigths()
  const isAllowedToChange = moderatorLevel

  const pageParams = {
    isAllowedToChange,
    slug,
    queryKey,
    queryParams,
    pageName,
    type: 'page',
    initialFormState: false,
  }

  return (
    <StyledPageGrid container data-testid="ecole-projets-pedagogique-screen">
      <Page pageParams={pageParams} />
    </StyledPageGrid>
  )
}

export default EcoleProjetsPedagogiqueScreen
