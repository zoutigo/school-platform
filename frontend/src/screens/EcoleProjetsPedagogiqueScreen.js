import React from 'react'
import Page from '../components/page/Page'
import { StyledPageGrid } from '../components/elements/styled'
import useRigths from '../components/hooks/useRigths'

function EcoleProjetsPedagogiqueScreen() {
  const pageName = 'projet pedagogique'
  const alias = `ecole-projets-pedagogique`
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
    <StyledPageGrid container>
      <Page pageParams={pageParams} />
    </StyledPageGrid>
  )
}

export default EcoleProjetsPedagogiqueScreen
