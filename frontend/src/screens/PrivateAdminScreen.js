import React from 'react'
import { Redirect } from 'react-router-dom'
import { StyledPageGrid } from '../components/elements/styled'
import useRigths from '../components/hooks/useRigths'
import Page from '../components/page/Page'

function PrivateAdminScreen() {
  const pageName = 'administration'
  const slug = `administration`
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
    <StyledPageGrid container data-testid="administration-screen">
      <Page pageParams={pageParams} />
    </StyledPageGrid>
  )

  // return <Redirect to="/private/administration/parametres" />
}

export default PrivateAdminScreen
