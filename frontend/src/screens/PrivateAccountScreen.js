import React from 'react'
import { StyledPageGrid } from '../components/elements/styled'
import useRigths from '../components/hooks/useRigths'
import Page from '../components/page/Page'

function PrivateAccountScreen() {
  const pageName = 'Mon Compte'
  const slug = `account`
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
  }
  return (
    <StyledPageGrid container>
      <Page pageParams={pageParams} />
    </StyledPageGrid>
  )
}

export default PrivateAccountScreen
