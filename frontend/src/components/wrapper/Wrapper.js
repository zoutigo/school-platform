import React from 'react'
import PropTypes from 'prop-types'
import { Grid } from '@material-ui/core'
import { StyledCentralScreen } from '../elements/styled'
import Main from './Main'
import Aside from './Aside'

function Wrapper({ main, aside }) {
  return (
    <StyledCentralScreen>
      <Grid container>
        <Main main={main} />
        {aside && <Aside aside={aside} />}
      </Grid>
    </StyledCentralScreen>
  )
}

Wrapper.defaultProps = {
  aside: null,
}
Wrapper.propTypes = {
  main: PropTypes.element.isRequired,
  aside: PropTypes.element,
}

export default Wrapper
