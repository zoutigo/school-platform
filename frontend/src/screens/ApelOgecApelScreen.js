/* eslint-disable import/named */
import React, { useCallback } from 'react'
import Page from '../components/page/Page'
import { StyledPageGrid } from '../components/elements/styled'
import useRigths from '../components/hooks/useRigths'
import useRoles from '../components/hooks/useRoles'

function ApelOgecApelScreen() {
  const pageName = 'APEL'
  const alias = `apel`
  const queryKey = [pageName, `page-${alias}`]
  const queryParams = `alias=${alias}`

  const { moderatorLevel } = useRigths()
  const { apelMembre } = useRoles()
  const isAllowedToChange = moderatorLevel || apelMembre

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

export default React.memo(ApelOgecApelScreen)
