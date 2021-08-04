/* eslint-disable import/named */
import { Grid } from '@material-ui/core'
import React, { useCallback, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { useRigths, useRoutesInfos } from '../utils/hooks'
import OGECTEAM from '../constants/ogecteam'
import AlertCollapse from '../components/elements/AlertCollapse'
import { StyledPageGrid } from '../components/elements/styled'
import Page from '../components/page/Page'
import { setCategoryAside } from '../redux/settings/SettingsActions'

function ApelOgecOgecScreen() {
  const dispatch = useDispatch()

  const {
    category: { current },
  } = useRoutesInfos()

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
  const { Asides } = useSelector((state) => state.settings)

  const asideExist = useCallback(() => {
    const exist =
      Asides.length < 1
        ? false
        : Array.isArray(Asides.find(([path, datas]) => path === current.path))

    return exist
  }, [Asides])

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

  // build ogecaside

  const createAside = useCallback(() => {
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
    dispatch(setCategoryAside([current.path, asideOgec]))
    return true
  }, [])

  if (!asideExist()) {
    createAside()
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

export default React.memo(ApelOgecOgecScreen)
