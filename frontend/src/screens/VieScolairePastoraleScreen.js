import React from 'react'
import Page from '../components/page/Page'
import { StyledPageGrid } from '../components/elements/styled'
import useRigths from '../components/hooks/useRigths'
import useRoles from '../components/hooks/useRoles'

function VieScolairePastoraleScreen() {
  const pageName = 'PASTORALE'
  const alias = `pastorale`
  const queryKey = [pageName, `page-${alias}`]
  const queryParams = `alias=${alias}`

  const { moderatorLevel } = useRigths()
  const { catechiste } = useRoles()
  const isAllowedToChange = moderatorLevel || catechiste

  const pageParams = {
    isAllowedToChange,
    alias,
    queryKey,
    queryParams,
    pageName,
    type: 'entity',
    initialFormState: false,
  }

  return (
    <StyledPageGrid container>
      <Page pageParams={pageParams} />
    </StyledPageGrid>
  )
}

export default VieScolairePastoraleScreen
