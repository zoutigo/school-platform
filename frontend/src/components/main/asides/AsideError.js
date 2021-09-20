import React from 'react'
import PropTypes from 'prop-types'
import { Box, styled, Typography } from '@material-ui/core'

const StyledBox = styled(Box)(({ theme }) => ({
  background: theme.palette.error.light,
  marginTop: '0.5rem',
  width: '100%',
  textAlign: 'center',
  height: '2.5rem',
  paddingTop: '5%',
}))

function AsideError({ errortext }) {
  return (
    <StyledBox>
      <Typography variant="body2">{errortext}</Typography>
    </StyledBox>
  )
}

AsideError.propTypes = {
  errortext: PropTypes.string.isRequired,
}

export default AsideError
