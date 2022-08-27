/* eslint-disable import/named */
import React from 'react'
import { StyledPageGrid } from '../components/elements/styled'
import useRigths from '../components/hooks/useRigths'
import Page from '../components/page/Page'

function VieScolaireHorairesFeriesScreen() {
  const pageName = 'Les jours Feriés'
  const slug = `viescolaire-horaires-feries`
  const queryKey = [pageName, `page-${slug}`]
  const queryParams = `slug=${slug}`
  const { moderatorLevel } = useRigths()
  const isAllowedToChange = moderatorLevel

  const pageParams = {
    slug,
    queryKey,
    queryParams,
    pageName,
    isAllowedToChange,
    type: 'page',
    initialFormState: false,
  }
  return (
    <StyledPageGrid container data-testid="viescolaire-horaires-feries-screen">
      <Page pageParams={pageParams} />
    </StyledPageGrid>
  )
}

export default VieScolaireHorairesFeriesScreen
