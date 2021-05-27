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
