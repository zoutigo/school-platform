/* eslint-disable import/named */
import React from 'react'
import { StyledPageGrid } from '../components/elements/styled'
import useRigths from '../components/hooks/useRigths'
import Page from '../components/page/Page'

function VieScolaireHorairesScreen() {
  const pageName = 'La garderie'
  const alias = `viescolaire-horaires`
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
    type: 'page',
    initialFormState: false,
  }
  return (
    <StyledPageGrid container data-testid="viescolaire-horaires-screen">
      <Page pageParams={pageParams} />
    </StyledPageGrid>
  )
}

export default VieScolaireHorairesScreen
