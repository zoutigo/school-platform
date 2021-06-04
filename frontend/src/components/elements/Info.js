import { Typography } from '@material-ui/core'
import { styled } from '@material-ui/styles'
import React from 'react'
import PropTypes from 'prop-types'

export const StyledInfoBox = styled('div')(({ bgcolor }) => ({
  minHeight: '2em',
  width: '100%',
  padding: '0.5em ',
  verticalAlign: 'center',
  background: bgcolor,
}))

function Info(props) {
  const { children, bgcolor } = props
  return (
    <StyledInfoBox bgcolor={bgcolor}>
      <Typography variant="body1">{children}</Typography>
    </StyledInfoBox>
  )
}

Info.propTypes = {
  children: PropTypes.string.isRequired,
  bgcolor: PropTypes.string.isRequired,
}

export default Info
