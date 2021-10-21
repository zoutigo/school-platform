/* eslint-disable import/named */
import { Grid } from '@material-ui/core'
import React, { useCallback, useState } from 'react'

import Page from '../components/page/Page'
import AlertCollapse from '../components/elements/AlertCollapse'
import { StyledPageGrid } from '../components/elements/styled'
import useRigths from '../components/hooks/useRigths'
import useRoles from '../components/hooks/useRoles'

function ApelOgecApelScreen() {
  const pageName = 'APEL'
  const alias = `apel-ogec-apel`
  const queryKey = [pageName, `page-${alias}`]
  const queryParams = `alias=${alias}`

  const [topAlert, setTopAlert] = useState({
    severity: '',
    alertText: '',
    openAlert: false,
  })
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
      setTopAlert,
    },
    []
  )

  return (
    <StyledPageGrid container>
      {topAlert.openAlert && (
        <Grid item container>
          <AlertCollapse
            alertText={topAlert.alertText}
            openAlert
            severity={topAlert.severity}
            callback={setTopAlert}
          />
        </Grid>
      )}
      <Page pageParams={pageParams} />
    </StyledPageGrid>
  )
}

export default React.memo(ApelOgecApelScreen)
