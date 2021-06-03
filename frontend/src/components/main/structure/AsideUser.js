import { Box, styled, Typography } from '@material-ui/core'
import React from 'react'
import PropTypes from 'prop-types'

const StyledAsideUser = styled(Box)(() => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '0.2rem',
  '& >:first-child': {
    textTransform: 'capitalize',
  },
  '& >:nth-child(2)': {
    textTransform: 'uppercase',
    marginLeft: '7px',
  },
  '& >:last-child': {
    textTransform: 'uppercase',
    marginLeft: '7px',
  },
}))

function AsideUser({ gender, firstname, lastname }) {
  return (
    <StyledAsideUser>
      <Typography variant="body2">{gender}</Typography>
      <Typography variant="body2"> {firstname}</Typography>
      <Typography variant="body2"> {lastname}</Typography>
    </StyledAsideUser>
  )
}

AsideUser.propTypes = {
  gender: PropTypes.string.isRequired,
  firstname: PropTypes.string.isRequired,
  lastname: PropTypes.string.isRequired,
}

export default AsideUser
