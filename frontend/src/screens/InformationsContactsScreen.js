import React from 'react'
import { StyledPageGrid } from '../components/elements/styled'
import useRigths from '../components/hooks/useRigths'
import Page from '../components/page/Page'

function InformationsContactsScreen() {
  const pageName = 'Nous contacter'
  const slug = `contacts`
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
    <StyledPageGrid container data-testid="informations-contacts-screen">
      <Page pageParams={pageParams} />
    </StyledPageGrid>
  )
}

export default InformationsContactsScreen
