/* eslint-disable import/named */
import React from 'react'
import Page from '../components/page/Page'
import { StyledPageGrid } from '../components/elements/styled'
import useRigths from '../components/hooks/useRigths'

function EcoleProjetsEducatifScreen() {
  const pageName = 'projet educatif'
  const slug = `ecole-projets-educatif`
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
    <StyledPageGrid container data-testid="ecole-projets-educatifs-screen">
      <Page pageParams={pageParams} />
    </StyledPageGrid>
  )
}

export default EcoleProjetsEducatifScreen
