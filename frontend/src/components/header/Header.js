/* eslint-disable import/named */
import React, { useCallback, useEffect } from 'react'
import MenuIcon from '@material-ui/icons/Menu'
import CancelIcon from '@material-ui/icons/Cancel'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

import { styled, useMediaQuery, useTheme } from '@material-ui/core'
import './headerStyle.css'
import Logo from './Logo'
import { StyledIconBox } from '../elements/styled'
import NavBloc from './NavBloc'
import { openSmallScreenNav } from '../../redux/settings/SettingsActions'
import { useRigths, useRoutesInfos } from '../../utils/hooks'
import MainDialog from '../elements/MainDialog'

const StyledHeader = styled('header')(() => ({
  zIndex: 10,
  position: 'fixed',
}))
function Header() {
  const theme = useTheme()
  const isSmallScreen = !useMediaQuery(theme.breakpoints.up('lg'))
  const { SmallScreenNavIsOpened } = useSelector((state) => state.settings)

  const dispatch = useDispatch()
  const { pathname } = useLocation()
  const { rubricsList } = useRoutesInfos()
  const { userLevel } = useRigths()

  const routeColors = useCallback(
    (route) => {
      const colors = Object.entries(theme.palette)
      if (!route) return colors.find(([key, value]) => key === 'visitor')[1]
      if (route.state.alias === 'private' && !userLevel)
        return colors.find(([key, value]) => key === 'visitor')[1]
      return colors.find(([key, value]) => key === route.state.alias)[1]
    },
    [userLevel]
  )

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
          {rubricsList.map((rubric) => {
            const { main, dark } = routeColors(rubric)

            return <NavBloc key={rubric.path} rubric={rubric} rubcolor={main} />
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
            {/* {SmallScreenNavIsOpened && <CancelIcon />} */}
          </StyledIconBox>
        </div>
      )}
      <MainDialog />
    </StyledHeader>
  )
}

export default React.memo(Header)
