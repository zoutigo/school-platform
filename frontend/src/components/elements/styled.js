import React from 'react'
import { Box, Button, Grid, styled } from '@material-ui/core'
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
    textAlign: 'center',
    padding: '0px auto',
    color: ({ bgcolor, theme }) => bgcolor || theme.palette.primary.main,
    // marginTop: ({ theme }) => theme.spacing(2),
    textAlign: 'center',
    '& svg': {
      fontSize: ({ fontsize }) => fontsize || '3rem',
    },
    '& .fa': {
      fontSize: ({ fontsize }) => fontsize || '3rem',
      color: ({ bgcolor, theme }) => bgcolor || theme.palette.primary.main,
      display: 'inline-block',
    },
  })
)

export const StyledMainApp = styled('main')(({ theme }) => ({
  width: '100%',
  minHeight: '80vh',
  overflow: 'hidden',
}))

const StyledScreen = styled('section')(({ theme }) => ({
  border: 'solid 1px',
  // width: '98.8vw',
  minHeight: '80vh',
  overflow: 'hidden',
  [theme.breakpoints.down('md')]: {
    margin: '5.9rem 0rem 1rem 0rem !important',
    // width: '100%',
  },
}))

export const StyledCentralScreen = withTheme(
  styled(({ location, ...rest }) => <StyledScreen {...rest} />)({
    margin: ({ location }) =>
      location === '/' ? '5.9rem 0rem 1rem 0rem' : '11rem 11rem 1rem 11rem',
  })
)

export const StyledHomeGrid = styled(Grid)(({ theme }) => ({
  padding: '2rem 3rem ',
  [theme.breakpoints.down('sm')]: {
    padding: '2rem 0.6rem',
  },
}))

export const StyledBaseButton = styled(Button)(() => ({
  width: '11rem',
  height: '3rem',
  marginTop: '1rem',
}))

export const StyledTitle = withTheme(
  styled(({ bgcolor, ...rest }) => <div {...rest} />)({
    minWidth: '11rem',
    height: '3rem',
    marginTop: '1rem',
    marginBottom: '1rem',
    background: ({ bgcolor }) => bgcolor,
  })
)
