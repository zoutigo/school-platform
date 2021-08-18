/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/named */
import { Grid } from '@material-ui/core'
import { styled } from '@material-ui/styles'
import React, { useCallback } from 'react'
import { Route, Switch, useLocation } from 'react-router-dom'
import HomeScreen from '../../screens/HomeScreen'
import { useRoutesInfos } from '../../utils/hooks'
import Navigator from '../elements/Navigator'
import { StyledCentralScreen, StyledMainApp } from '../elements/styled'

import asidesList from './asides/asidesList'
import BodyBloc from './BodyBloc'
import TitleBloc from './structure/TitleBloc'

const StyledCentralBloc = styled(Grid)(() => ({}))

function Main() {
  const { pathname } = useLocation()

  const { category } = useRoutesInfos()

  const hasAside = useCallback(() => {
    const aside = asidesList.find(
      (item) => category.current?.path === item.categorypath
    )
    if (!aside) return null
    return aside.component
  }, [asidesList, category])

  return (
    <StyledMainApp>
      <StyledCentralScreen location={pathname}>
        <Switch>
          <>
            {pathname === '/' && (
              <Route path="/" component={HomeScreen} exact />
            )}
            {pathname !== '/' && (
              <StyledCentralBloc container alignItems="flex-start">
                <Grid item container xs={12} md={hasAside() ? 9 : 12}>
                  <TitleBloc />
                  <BodyBloc />
                </Grid>
                {hasAside()}
                <Navigator />
              </StyledCentralBloc>
            )}
          </>
        </Switch>
      </StyledCentralScreen>
    </StyledMainApp>
  )
}

export default React.memo(Main)
