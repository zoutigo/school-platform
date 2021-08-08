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

  const rubricColor = useCallback(
    (rubric) => {
      const colors = Object.entries(theme.palette)
      const sortedcolors = colors.filter(
        /* eslint-disable */
        ([key, object]) => key === rubric.state.alias
      )

      const [rubricalias, rubricColors] = sortedcolors[0]

      const rubColor =
        rubricalias === 'private' && !userLevel
          ? rubricColors?.dark
          : rubricColors?.main
      return rubColor
    },
    [theme, userLevel]
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
            const colors = Object.entries(theme.palette)
            // const sortedcolors = colors.filter(
            //   /* eslint-disable */
            //   ([key, object]) => key === rubric.state.alias
            // )
            // const [rubcolors] = sortedcolors
            // const rubcolor = rubcolors ? rubcolors[1].main : ''

            return (
              <NavBloc
                key={rubric.path}
                rubric={rubric}
                rubcolor={rubricColor(rubric)}
              />
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
            {/* {SmallScreenNavIsOpened && <CancelIcon />} */}
          </StyledIconBox>
        </div>
      )}
      <MainDialog />
    </StyledHeader>
  )
}

export default React.memo(Header)
