/* eslint-disable import/named */
import { Grid, useTheme } from '@material-ui/core'
import { styled } from '@material-ui/styles'
import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { Route, Switch, useLocation } from 'react-router-dom'
import HomeScreen from '../../screens/HomeScreen'
import { useRigths, useRoutesInfos, useThemeColors } from '../../utils/hooks'
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
  const { userLevel } = useRigths()

  const HasAside = useCallback(() => {
    const categoryPath = category.current?.path ? category.current.path : null
    const aside =
      Asides.filter(([asidepath, ...rest]) => asidepath === categoryPath)
        .length > 0

    return aside
  }, [category, Asides])

  const colorAlias =
    rubric.state.alias === 'private' && !userLevel
      ? 'visitor'
      : rubric.state.alias

  const rubricolors = useThemeColors(colorAlias)

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
                  <TitleBloc rubriccolors={rubricolors} />
                  <BodyBloc />
                </Grid>
                {HasAside() && <Aside rubriccolors={rubricolors} md={3} />}
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
