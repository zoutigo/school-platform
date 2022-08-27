/* eslint-disable import/named */
import React from 'react'
import Page from '../components/page/Page'
import { StyledPageGrid } from '../components/elements/styled'
import useRigths from '../components/hooks/useRigths'

function VieScolaireGarderieEtudeScreen() {
  const pageName = 'etude garderie'
  const slug = `viescolaire-garderie-etude`
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
    <StyledPageGrid container data-testid="viescolaire-garderie-screen">
      <Page pageParams={pageParams} />
    </StyledPageGrid>
  )
}

export default VieScolaireGarderieEtudeScreen
