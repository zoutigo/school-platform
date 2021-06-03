import { Box, styled, Typography } from '@material-ui/core'
import React from 'react'
import PropTypes from 'prop-types'

const StyledAsideSubTitle = styled(Box)(() => ({
  width: '100%',
  textAlign: 'center',
  paddingTop: '1rem',
}))

function AsideSubTitle({ subtitle }) {
  return (
    <StyledAsideSubTitle>
      <Typography variant="subtitle1">{subtitle}</Typography>
    </StyledAsideSubTitle>
  )
}

AsideSubTitle.propTypes = {
  subtitle: PropTypes.string.isRequired,
}

export default AsideSubTitle
