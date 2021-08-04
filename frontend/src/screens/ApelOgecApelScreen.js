/* eslint-disable import/named */
import { Grid } from '@material-ui/core'
import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import APELTEAM from '../constants/apelteam'
import { setCategoryAside } from '../redux/settings/SettingsActions'

import { useRigths, useRoutesInfos } from '../utils/hooks'
import Page from '../components/page/Page'
import AlertCollapse from '../components/elements/AlertCollapse'
import { StyledPageGrid } from '../components/elements/styled'

function ApelOgecApelScreen() {
  const dispatch = useDispatch()

  const {
    category: { current },
  } = useRoutesInfos()
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

  const createAside = useCallback(() => {
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
    dispatch(setCategoryAside([current.path, asideApel]))
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

export default React.memo(ApelOgecApelScreen)
