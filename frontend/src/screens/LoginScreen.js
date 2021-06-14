import { Grid } from '@material-ui/core'
import React from 'react'
import { StyledNavLink } from '../components/elements/styled'

function LoginScreen() {
  return (
    <Grid container>
      <StyledNavLink to="/register"> Pas de compte ?</StyledNavLink>
    </Grid>
  )
}

export default LoginScreen
