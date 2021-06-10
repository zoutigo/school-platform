import { Box, styled, Typography } from '@material-ui/core'
import React from 'react'
import PropTypes from 'prop-types'

const StyledAsideUser = styled(Box)(() => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '0.2rem',
  textTransform: 'lowercase',
}))

function AsideItemText({ text }) {
  return (
    <StyledAsideUser>
      <Typography variant="body2"> {text}</Typography>
    </StyledAsideUser>
  )
}

AsideItemText.propTypes = {
  text: PropTypes.string.isRequired,
}

export default AsideItemText
