import React from 'react'
import { Redirect } from 'react-router-dom'
import { StyledPageGrid } from '../components/elements/styled'
import useRigths from '../components/hooks/useRigths'
import Page from '../components/page/Page'

function PrivateAdminScreen() {
  const pageName = 'administration'
  const alias = `administration`
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

  // return <Redirect to="/private/administration/parametres" />
}

export default PrivateAdminScreen
