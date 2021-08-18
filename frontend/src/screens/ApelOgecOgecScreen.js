/* eslint-disable import/named */
import { Grid } from '@material-ui/core'
import React, { useCallback, useState } from 'react'

import { useRigths } from '../utils/hooks'
import AlertCollapse from '../components/elements/AlertCollapse'
import { StyledPageGrid } from '../components/elements/styled'
import Page from '../components/page/Page'

function ApelOgecOgecScreen() {
  const pageName = 'OGEC'
  const alias = `apel-ogec-ogec`
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

export default React.memo(ApelOgecOgecScreen)
