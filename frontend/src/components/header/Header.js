import React from 'react'

import AccountCircleIcon from '@material-ui/icons/AccountCircle'

import './style.css'
import { useTheme } from '@material-ui/core'
import Logo from './Logo'
import { StyledIconBox } from '../elements/styled'
import rubrics from '../../constants/rubrics'
import NavBloc from './NavBloc'

function Header() {
  const theme = useTheme()
  return (
    <header className="row">
      <div className="logo">
        <Logo />
      </div>
      <ul className="row nav">
        {rubrics.map((rubric) => (
          <NavBloc key={rubric.alias} rubric={rubric} />
        ))}
      </ul>
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
    </header>
  )
}

export default Header
