/* eslint-disable import/named */
import { Grid } from '@material-ui/core'
import React, { useCallback, useState } from 'react'

import { useRigths } from '../utils/hooks'
import Page from '../components/page/Page'
import AlertCollapse from '../components/elements/AlertCollapse'
import { StyledPageGrid } from '../components/elements/styled'

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

  const pageParams = useCallback(
    {
      isAllowedToChange: moderatorLevel,
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
