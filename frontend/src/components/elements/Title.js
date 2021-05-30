import { Typography } from '@material-ui/core'
import { styled } from '@material-ui/styles'
import React from 'react'
import PropTypes from 'prop-types'

const StyledTypo = styled(Typography)(({ color }) => ({
  color: color,
}))

function Title({ title, color }) {
  return (
    <StyledTypo variant="h3" color={color}>
      {title}
    </StyledTypo>
  )
}

Title.propTypes = {
  title: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
}

export default Title
