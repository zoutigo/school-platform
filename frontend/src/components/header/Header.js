import React, { useEffect } from 'react'
import MenuIcon from '@material-ui/icons/Menu'
import CancelIcon from '@material-ui/icons/Cancel'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

import { styled, useMediaQuery, useTheme } from '@material-ui/core'
import './headerStyle.css'
import Logo from './Logo'
import { StyledIconBox } from '../elements/styled'
import rubrics from '../../constants/rubrics'
import NavBloc from './NavBloc'
import { openSmallScreenNav } from '../../redux/settings/SettingsActions'

const StyledHeader = styled('header')(() => ({
  zIndex: 10,
  position: 'fixed',
}))
function Header() {
  const theme = useTheme()
  const isSmallScreen = !useMediaQuery(theme.breakpoints.up('lg'))
  const { SmallScreenNavIsOpened } = useSelector((state) => state.settings)
  const {
    User: { exp },
  } = useSelector((state) => state.user)

  const tokenIsValid = !exp ? false : exp > new Date().getTime() / 1000

  const dispatch = useDispatch()
  const { pathname } = useLocation()

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
              tokenIsValid
            )
              return null
            if (rubric.route.path === '/private' && !tokenIsValid) return null
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
      {/* {!isSmallScreen && (
        <ul
          className="private"
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            background: 'blue',
          }}
        >
          <li style={{ background: 'pink' }}>
            <StyledIconBox bgcolor={theme.palette.error.main} fontsize="2.2rem">
              <AccountCircleIcon />
            </StyledIconBox>
          </li>
          <li
            className="mt-2 btn-height"
            style={{
              background: 'purple',
              marginTop: '-0.07rem',
            }}
          >
            <div className="dropdown" style={{ marginTop: '0.8rem' }}>
              <StyledNavLink to="/login">
                <Typography varian="h6">Login</Typography>
              </StyledNavLink>
              <ul className="dropdown-content">
                <li>Mon compte</li>
              </ul>
            </div>
            <div className="dropdown">
              <Typography varian="h6">Admin</Typography>
              <ul className="dropdown-content">
                <li>Gestion des roles</li>
                <li>Organigramme</li>
                <li>Inscire utilisateur</li>
              </ul>
            </div>
          </li>
        </ul>
      )} */}
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
    </StyledHeader>
  )
}

export default Header
