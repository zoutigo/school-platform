import { Grid } from '@material-ui/core'
import React, { useState } from 'react'
import Page from '../components/page/Page'
import AlertCollapse from '../components/elements/AlertCollapse'
import { StyledPageGrid } from '../components/elements/styled'

function VieScolaireGarderiePresentationScreen() {
  const pageName = 'presentation garderie'
  const alias = `viescolaire-garderie-presentation`
  const queryKey = [pageName, `page-${alias}`]
  const queryParams = `alias=${alias}`

  const [topAlert, setTopAlert] = useState({
    severity: '',
    alertText: '',
    openAlert: false,
  })

  const pageParams = { alias, queryKey, queryParams, pageName, setTopAlert }

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

export default VieScolaireGarderiePresentationScreen
