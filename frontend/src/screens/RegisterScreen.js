import React from 'react'
import { Grid } from '@material-ui/core'
import { StyledNavLink } from '../components/elements/styled'

function RegisterScreen() {
  return (
    <Grid container>
      <StyledNavLink to="/login"> Deja un compte ?</StyledNavLink>
    </Grid>
  )
}

export default RegisterScreen
