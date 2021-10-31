/* eslint-disable import/named */
import React, { useCallback } from 'react'
import { StyledPageGrid } from '../components/elements/styled'
import useRigths from '../components/hooks/useRigths'
import useRoles from '../components/hooks/useRoles'
import Page from '../components/page/Page'

function ApelOgecOgecScreen() {
  const pageName = 'OGEC'
  const alias = `ogec`
  const queryKey = [pageName, `page-${alias}`]
  const queryParams = `alias=${alias}`

  const { moderatorLevel } = useRigths()
  const { ogecMembre } = useRoles()
  const isAllowedToChange = moderatorLevel || ogecMembre

  const pageParams = useCallback(
    {
      isAllowedToChange,
      alias,
      queryKey,
      queryParams,
      pageName,
      type: 'entity',
      initialFormState: false,
    },
    []
  )

  return (
    <StyledPageGrid container>
      <Page pageParams={pageParams} />
    </StyledPageGrid>
  )
}

export default React.memo(ApelOgecOgecScreen)
