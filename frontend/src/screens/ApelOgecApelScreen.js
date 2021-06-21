import { Grid } from '@material-ui/core'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import APELTEAM from '../constants/apelteam'
import { setCategoryAside } from '../redux/settings/SettingsActions'

import { useCurrentCategory } from '../utils/hooks'
import Page from '../components/page/Page'
import AlertCollapse from '../components/elements/AlertCollapse'
import { StyledPageGrid } from '../components/elements/styled'

function ApelOgecApelScreen() {
  const dispatch = useDispatch()
  const { path: categoryPath } = useCurrentCategory()
  const pageName = 'APEL'
  const alias = `apel-ogec-apel`
  const queryKey = [pageName, `page-${alias}`]
  const queryParams = `alias=${alias}`

  const [topAlert, setTopAlert] = useState({
    severity: '',
    alertText: '',
    openAlert: false,
  })
  const pageParams = { alias, queryKey, queryParams, pageName, setTopAlert }
  // build apel aside
  const asideApel = {
    title: 'Bureau Apel',
    items: APELTEAM.map((teamer) => {
      const { role, gender, firstname, lastname } = teamer
      return {
        subtitle: role,
        user: { gender, firstname, lastname },
      }
    }),
  }
  dispatch(setCategoryAside([categoryPath, asideApel]))

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

export default ApelOgecApelScreen
