/* eslint-disable import/named */

import React from 'react'
import Page from '../components/page/Page'
import { StyledPageGrid } from '../components/elements/styled'
import useRigths from '../components/hooks/useRigths'

function VieScolaireGarderiePresentationScreen() {
  const pageName = 'presentation garderie'
  const slug = `viescolaire-garderie-presentation`
  const queryKey = [pageName, `page-${slug}`]
  const queryParams = `slug=${slug}`

  const { managerLevel, adminLevel } = useRigths()
  const isAllowedToChange = managerLevel || adminLevel

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
    <StyledPageGrid
      container
      data-testid="viescolaire-garderie-presentation-screen"
    >
      <Page pageParams={pageParams} />
    </StyledPageGrid>
  )
}

export default VieScolaireGarderiePresentationScreen
