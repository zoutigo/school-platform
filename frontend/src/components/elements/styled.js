import React from 'react'
import { Box, styled } from '@material-ui/core'
import { withTheme } from '@material-ui/styles'
import { NavLink } from 'react-router-dom'
// import theme from '../../constants/theme'

/* eslint-disable */

export const StyledNavLink = styled(NavLink)(() => ({
  color: 'inherit',
  textDecoration: 'inherit',
}))

export const StyledIconBox = withTheme(
  styled(({ bgcolor, fontsize, theme, ...rest }) => <Box {...rest} />)({
    color: ({ bgcolor, theme }) => bgcolor || theme.palette.primary.main,
    // marginTop: ({ theme }) => theme.spacing(2),
    textAlign: 'center',
    '& svg': {
      fontSize: ({ fontsize }) => fontsize || '3rem',
    },
  })
)

export const StyledMain = styled('main')(({ theme }) => ({
  border: 'solid 1px',
  width: '100vw',
  minHeight: '80vh',
  [theme.breakpoints.down('md')]: {
    margin: '7rem 0rem 1rem 0rem !important',
  },
}))

export const StyledMainApp = withTheme(
  styled(({ location, ...rest }) => <StyledMain {...rest} />)({
    margin: ({ location }) =>
      location === 'home' ? '7rem 0rem 1rem 0rem' : '7rem 5rem 1rem 5rem',
  })
)
