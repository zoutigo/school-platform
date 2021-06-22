import { Grid } from '@material-ui/core'
import React, { useState } from 'react'

import { useDispatch } from 'react-redux'

import { useCurrentCategory, useRigths } from '../utils/hooks'
import OGECTEAM from '../constants/ogecteam'
import AlertCollapse from '../components/elements/AlertCollapse'
import { StyledPageGrid } from '../components/elements/styled'
import Page from '../components/page/Page'
import { setCategoryAside } from '../redux/settings/SettingsActions'

function ApelOgecOgecScreen() {
  const dispatch = useDispatch()
  const { path: categoryPath } = useCurrentCategory()
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
  const isAllowedToChange = moderatorLevel

  const pageParams = {
    isAllowedToChange,
    alias,
    queryKey,
    queryParams,
    pageName,
    setTopAlert,
  }

  // build ogecaside
  const asideOgec = {
    title: 'Bureau Ogec',
    items: OGECTEAM.map((teamer) => {
      const { role, gender, firstname, lastname } = teamer
      return {
        subtitle: role,
        user: { gender, firstname, lastname },
      }
    }),
  }
  dispatch(setCategoryAside([categoryPath, asideOgec]))

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

export default ApelOgecOgecScreen
