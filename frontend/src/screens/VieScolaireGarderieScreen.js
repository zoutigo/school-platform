/* eslint-disable arrow-body-style */
/* eslint-disable import/named */

import React from 'react'
import Page from '../components/page/Page'

import { StyledPageGrid } from '../components/elements/styled'
import useRigths from '../components/hooks/useRigths'

function VieScolaireGarderieScreen() {
  const pageName = 'La garderie'
  const alias = `viescolaire-garderie`
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
    <StyledPageGrid container data-testid="viescolaire-garderie-screen">
      <Page pageParams={pageParams} />
    </StyledPageGrid>
  )
}

export default VieScolaireGarderieScreen
