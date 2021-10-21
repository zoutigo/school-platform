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
  const { managerLevel, adminLevel } = useRigths()
  const isAllowedToChange = managerLevel || adminLevel

  const pageParams = {
    alias,
    queryKey,
    queryParams,
    pageName,
    isAllowedToChange,
  }

  return (
    <StyledPageGrid container>
      <Page pageParams={pageParams} />
    </StyledPageGrid>
  )
}

export default VieScolaireGarderieScreen
