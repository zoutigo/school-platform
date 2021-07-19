import { Grid, styled, Typography } from '@material-ui/core'
import React from 'react'

const StyledTypo = styled(Typography)(({ theme }) => ({
  color: theme.palette.error.main,
  textTransform: 'uppercase',
  fontSize: '3rem',
}))

function UnderConstruction() {
  return (
    <Grid item container>
      <StyledTypo variant="h2">Page en construction</StyledTypo>
    </Grid>
  )
}

export default UnderConstruction
