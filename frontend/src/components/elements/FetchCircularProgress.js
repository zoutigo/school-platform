import React from 'react'
import { Grid } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'

function FetchCircularProgress() {
  return (
    <Grid container justifyContent="center">
      <CircularProgress color="secondary" />
    </Grid>
  )
}

export default FetchCircularProgress
