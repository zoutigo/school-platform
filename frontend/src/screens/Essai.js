import React from 'react'
import { Grid, TextField } from '@material-ui/core'

function Essai() {
  return (
    <Grid container data-testid="essai">
      <TextField
        variant="outlined"
        fullWidth
        id="email"
        label="Email"
        placeholder="Entrez votre email"
        inputProps={{ type: 'email' }}
        helperText="bonjour"
      />
    </Grid>
  )
}

export default Essai
