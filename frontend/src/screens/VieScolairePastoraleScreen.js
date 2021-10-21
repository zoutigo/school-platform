import React, { useState } from 'react'
import { Grid } from '@material-ui/core'
import Page from '../components/page/Page'
import AlertCollapse from '../components/elements/AlertCollapse'
import { StyledPageGrid } from '../components/elements/styled'
import useRigths from '../components/hooks/useRigths'
import useRoles from '../components/hooks/useRoles'

function VieScolairePastoraleScreen() {
  const pageName = 'PASTORALE'
  const alias = `viescolaire-pastorale`
  const queryKey = [pageName, `page-${alias}`]
  const queryParams = `alias=${alias}`

  const [topAlert, setTopAlert] = useState({
    severity: '',
    alertText: '',
    openAlert: false,
  })

  const { moderatorLevel } = useRigths()
  const { catechiste } = useRoles()
  const isAllowedToChange = moderatorLevel || catechiste

  const pageParams = {
    isAllowedToChange,
    alias,
    queryKey,
    queryParams,
    pageName,
    setTopAlert,
  }

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

export default VieScolairePastoraleScreen
