import { Grid } from '@material-ui/core'
import React from 'react'
import PropTypes from 'prop-types'

function Aside({ aside }) {
  return (
    <Grid item xs={false} md={4}>
      {aside}
    </Grid>
  )
}

Aside.defaultProps = {
  aside: null,
}
Aside.propTypes = {
  aside: PropTypes.element,
}

export default Aside
