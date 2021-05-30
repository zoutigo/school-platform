import { Typography } from '@material-ui/core'
import { styled } from '@material-ui/styles'
import React from 'react'
import PropTypes from 'prop-types'

const StyledTypo = styled(Typography)(({ textcolor }) => ({
  color: textcolor,
}))

function Title({ title, textcolor }) {
  return (
    <StyledTypo variant="h3" textcolor={textcolor}>
      {title}
    </StyledTypo>
  )
}

Title.propTypes = {
  title: PropTypes.string.isRequired,
  textcolor: PropTypes.string.isRequired,
}

export default Title
