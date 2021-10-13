import { Grid, Typography } from '@material-ui/core'
import React from 'react'
import LazyMessage from './LazyMessage'

function UnderConstruction() {
  const UnderConstructionMessage = () => (
    <Grid item container>
      <Typography variant="h2" color="secondary">
        Cette page est en cours de contruction.
      </Typography>
      <Typography variant="body1">
        {`
         Nous mettons tout en oeuvre pour la rendre opérationnelle dans les
         meilleurs délais.
        `}
      </Typography>
      <Typography variant="body1">
        {`En attendant, n'hésitez pas à consulter les autres rubriques et pages
        du site.`}
      </Typography>
    </Grid>
  )
  return (
    <Grid item container>
      <LazyMessage severity="error">
        <UnderConstructionMessage />
      </LazyMessage>
    </Grid>
  )
}

export default UnderConstruction
