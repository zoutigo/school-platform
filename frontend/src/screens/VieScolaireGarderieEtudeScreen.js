/* eslint-disable import/named */
import React from 'react'
import Page from '../components/page/Page'
import { StyledPageGrid } from '../components/elements/styled'
import { useRigths } from '../utils/hooks'

function VieScolaireGarderieEtudeScreen() {
  const pageName = 'etude garderie'
  const alias = `viescolaire-garderie-etude`
  const queryKey = [pageName, `page-${alias}`]
  const queryParams = `alias=${alias}`

  const { managerLevel, adminLevel } = useRigths()
  const isAllowedToChange = managerLevel || adminLevel

  const pageParams = {
    isAllowedToChange,
    alias,
    queryKey,
    queryParams,
    pageName,
  }

  return (
    <StyledPageGrid container>
      <Page pageParams={pageParams} />
    </StyledPageGrid>
  )
}

export default VieScolaireGarderieEtudeScreen
