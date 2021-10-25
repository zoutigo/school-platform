import React from 'react'
import { StyledPageGrid } from '../components/elements/styled'
import useRigths from '../components/hooks/useRigths'
import Page from '../components/page/Page'

function PrivateAccountScreen() {
  const pageName = 'Mon Compte'
  const alias = `account`
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
  }
  return (
    <StyledPageGrid container>
      <Page pageParams={pageParams} />
    </StyledPageGrid>
  )
}

export default PrivateAccountScreen
