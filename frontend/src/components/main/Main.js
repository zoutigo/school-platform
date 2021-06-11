import { Grid, useTheme } from '@material-ui/core'
import { styled } from '@material-ui/styles'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Route, Switch, useLocation } from 'react-router-dom'
import HomeScreen from '../../screens/HomeScreen'
import { useCurrentCategory } from '../../utils/hooks'
import { StyledCentralScreen, StyledMainApp } from '../elements/styled'

import Aside from './Aside'
import BodyBloc from './BodyBloc'
import TitleBloc from './structure/TitleBloc'

const StyledCentralBloc = styled(Grid)(() => ({}))

function Main() {
  const { pathname } = useLocation()
  const { palette } = useTheme()
  const { path: catePath } = useCurrentCategory()
  const { Asides } = useSelector((state) => state.settings)
  const [rubriccolors, setRubriccolors] = useState({
    main: 'white',
    light: 'white',
    dark: 'white',
  })
  const [hasAside, setHasAside] = useState(false)
  const entries = Object.entries(palette)
  const rubricAlias = pathname.split('/')[1]

  useEffect(() => {
    if (rubricAlias && pathname !== '/') {
      // eslint-disable-next-line no-unused-vars
      const colors = entries.filter(([key, value]) => key === rubricAlias)[0][1]
      if (colors) {
        setRubriccolors(colors)
      }
    }
  }, [pathname])

  useEffect(() => {
    const categoryAside = Asides.find(
      // eslint-disable-next-line no-unused-vars
      ([categoryPath, ...rest]) => categoryPath === catePath
    )

    if (categoryAside) {
      setHasAside(true)
    }
    return () => {
      setHasAside(false)
    }
  }, [useCurrentCategory()])

  return (
    <StyledMainApp>
      <StyledCentralScreen location={pathname}>
        <Switch>
          <>
            {pathname === '/' && (
              <Route path="/" component={HomeScreen} exact />
            )}
            {pathname !== '/' && (
              <StyledCentralBloc container>
                <Grid item container xs={12} md={hasAside ? 9 : 12}>
                  <TitleBloc
                    rubriccolors={rubriccolors}
                    setHasAside={setHasAside}
                  />
                  <BodyBloc />
                </Grid>
                {hasAside && <Aside rubriccolors={rubriccolors} />}
              </StyledCentralBloc>
            )}
          </>
        </Switch>
      </StyledCentralScreen>
    </StyledMainApp>
  )
}

export default Main
