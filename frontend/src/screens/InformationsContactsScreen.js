import React from 'react'
import { StyledPageGrid } from '../components/elements/styled'
import useRigths from '../components/hooks/useRigths'
import Page from '../components/page/Page'

function InformationsContactsScreen() {
  const pageName = 'Nous contacter'
  const alias = `contacts`
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
    type: 'page',
    initialFormState: false,
  }
  return (
    <StyledPageGrid container data-testid="informations-contacts-screen">
      <Page pageParams={pageParams} />
    </StyledPageGrid>
  )
}

export default InformationsContactsScreen
