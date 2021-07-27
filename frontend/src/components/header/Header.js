/* eslint-disable import/named */
import React, { useEffect } from 'react'
import MenuIcon from '@material-ui/icons/Menu'
import CancelIcon from '@material-ui/icons/Cancel'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { useQuery } from 'react-query'

import { styled, useMediaQuery, useTheme } from '@material-ui/core'
import './headerStyle.css'
import Logo from './Logo'
import { StyledIconBox } from '../elements/styled'
import rubrics from '../../constants/rubrics'
import NavBloc from './NavBloc'
import {
  openSmallScreenNav,
  setAllRoutes,
} from '../../redux/settings/SettingsActions'
import { useRigths } from '../../utils/hooks'
import { apiFetchChemin } from '../../utils/api'
import MainDialog from '../elements/MainDialog'

const StyledHeader = styled('header')(() => ({
  zIndex: 10,
  position: 'fixed',
}))
function Header() {
  const theme = useTheme()
  const isSmallScreen = !useMediaQuery(theme.breakpoints.up('lg'))
  const { SmallScreenNavIsOpened, Routes } = useSelector(
    (state) => state.settings
  )
  const { userLevel } = useRigths()
  const dispatch = useDispatch()
  const { pathname } = useLocation()

  const { isLoading, isError, data, error } = useQuery(['liste-chemins'], () =>
    apiFetchChemin()
  )

  useEffect(() => {
    if (data && Array.isArray(data) && data.length > 0) {
      const newRoutes = Routes.map((route) => {
        const newRoute = { ...route }
        const match = data.find((chemin) => chemin.path === route.path)
        newRoute.description = match ? match.description : ''
        newRoute.filepath = match ? match.filepath : ''
        return newRoute
      })

      dispatch(setAllRoutes(newRoutes))
    }
  }, [data])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <StyledHeader className="row">
      <div className="logo">
        <Logo />
      </div>
      {!isSmallScreen && (
        <ul className="row nav">
          {rubrics.map((rubric) => {
            const colors = Object.entries(theme.palette)
            const sortedcolors = colors.filter(
              /* eslint-disable */
              ([key, object]) => key === rubric.alias
            )
            const [rubcolors] = sortedcolors
            const rubcolor = rubcolors ? rubcolors[1].main : ''

            if (
              (rubric.route.path === '/register' ||
                rubric.route.path === '/login') &&
              userLevel
            )
              return null
            if (rubric.route.path === '/private' && !userLevel) return null
            if (rubric.route.path === '/register' && pathname !== '/register') {
              return null
            }
            if (rubric.route.path === '/login' && pathname === '/register') {
              return null
            }

            return (
              <NavBloc key={rubric.alias} rubric={rubric} rubcolor={rubcolor} />
            )
          })}
        </ul>
      )}

      {isSmallScreen && (
        <div className="mr-1 ml-1">
          <StyledIconBox
            className="cursor"
            bgcolor={
              SmallScreenNavIsOpened
                ? theme.palette.error.main
                : theme.palette.primary.main
            }
            fontsize="4.2rem"
            onClick={() => {
              dispatch(openSmallScreenNav())
            }}
          >
            {!SmallScreenNavIsOpened && <MenuIcon />}
            {SmallScreenNavIsOpened && <CancelIcon />}
          </StyledIconBox>
        </div>
      )}
      <MainDialog />
    </StyledHeader>
  )
}

export default Header
