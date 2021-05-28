import { styled, useMediaQuery, useTheme } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { openSmallScreenNav } from '../../redux/settings/SettingsActions'

const StyledSmallScreenDiv = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: 100,
  left: 0,
  zIndex: 5,
  background: 'red',

  [theme.breakpoints.between('md', 'lg')]: {
    width: '25%',
  },
  [theme.breakpoints.between('sm', 'md')]: {
    width: '50%',
  },
  [theme.breakpoints.between('xs', 'sm')]: {
    width: '75%',
  },
  [theme.breakpoints.down('xs')]: {
    width: '100%',
  },

  [theme.breakpoints.up('lg')]: {
    display: 'none',
  },
}))

function SmallScreenNav() {
  const dispatch = useDispatch()
  const theme = useTheme()
  const { SmallScreenNavIsOpened } = useSelector((state) => state.settings)

  const matches = useMediaQuery(theme.breakpoints.up('lg'))

  /* eslint-disable-next-line */
  useEffect(() => {
    dispatch(openSmallScreenNav(false))
  }, [matches, dispatch])

  if (!SmallScreenNavIsOpened) return null
  return <StyledSmallScreenDiv>The small Screen menu</StyledSmallScreenDiv>
}

export default SmallScreenNav
