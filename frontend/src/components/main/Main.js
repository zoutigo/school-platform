/* eslint-disable import/named */
import { Grid, useTheme } from '@material-ui/core'
import { styled } from '@material-ui/styles'
import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { Route, Switch, useLocation } from 'react-router-dom'
import HomeScreen from '../../screens/HomeScreen'
import { useRoutesInfos } from '../../utils/hooks'
import Navigator from '../elements/Navigator'
import { StyledCentralScreen, StyledMainApp } from '../elements/styled'

import Aside from './Aside'
import BodyBloc from './BodyBloc'
import TitleBloc from './structure/TitleBloc'

const StyledCentralBloc = styled(Grid)(() => ({}))

function Main() {
  const { pathname } = useLocation()
  const { palette } = useTheme()
  const { Asides } = useSelector((state) => state.settings)

  const { category, rubric } = useRoutesInfos()

  const HasAside = useCallback(() => {
    const categoryPath = category.current?.path ? category.current.path : null
    const aside =
      Asides.filter(([asidepath, ...rest]) => asidepath === categoryPath)
        .length > 0

    return aside
  }, [category, Asides])

  const RubricColors = useCallback(() => {
    const rubricstate = rubric ? rubric.state : null
    const colors =
      pathname !== '/' && rubricstate
        ? Object.entries(palette).filter(
            ([key, value]) => key === rubricstate.alias
          )[0][1]
        : {
            main: 'white',
            light: 'white',
            dark: 'white',
          }

    return colors
  }, [rubric])

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
                <Grid item container xs={12} md={HasAside() ? 9 : 12}>
                  <TitleBloc rubriccolors={RubricColors()} />
                  <BodyBloc />
                </Grid>
                {HasAside() && <Aside rubriccolors={RubricColors()} md={3} />}
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
