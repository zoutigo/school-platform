/* eslint-disable import/named */
import React from 'react'
import Page from '../components/page/Page'
import { StyledPageGrid } from '../components/elements/styled'
import { useRigths } from '../utils/hooks'

function EcoleProjetsEducatifScreen() {
  const pageName = 'projet educatif'
  const alias = `ecole-projets-educatif`
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
  }

  return (
    <StyledPageGrid container>
      <Page pageParams={pageParams} />
    </StyledPageGrid>
  )
}

export default EcoleProjetsEducatifScreen
