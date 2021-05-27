import React from 'react'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import { useMediaQuery, useTheme } from '@material-ui/core'
import './headerStyle.css'
import Logo from './Logo'
import { StyledIconBox } from '../elements/styled'
import rubrics from '../../constants/rubrics'
import NavBloc from './NavBloc'

function Header() {
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <header className="row">
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

            return (
              <NavBloc key={rubric.alias} rubric={rubric} rubcolor={rubcolor} />
            )
          })}
        </ul>
      )}
      {!isSmallScreen && (
        <ul className="private column">
          <li>
            <StyledIconBox bgcolor={theme.palette.apelogec.main}>
              <AccountCircleIcon fontSize="large" />
            </StyledIconBox>
          </li>
          <li className="mt-2">
            <div className="dropdown">
              Login
              <ul className="dropdown-content">
                <li>Mon compte</li>
              </ul>
            </div>
            <div className="dropdown">
              Admin
              <ul className="dropdown-content">
                <li>Gestion des roles</li>
                <li>Organigramme</li>
                <li>Inscire utilisateur</li>
              </ul>
            </div>
          </li>
        </ul>
      )}
    </header>
  )
}

export default Header
