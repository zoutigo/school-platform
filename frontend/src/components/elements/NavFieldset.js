import { Grid, styled, Typography } from '@material-ui/core'
import React from 'react'
import PropTypes from 'prop-types'
import { StyledNavLink } from './styled'

const StyledFieldset = styled('fieldset')(({ theme }) => ({
  border: `solid 1px ${theme.palette.secondary.main}`,
  borderRadius: '5px',
  padding: '0.4rem',
  margin: '0.4rem 0px',
  width: '100%',
  '& >div': {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    '& >div': {
      marginRight: '1rem',
      '& .active': {
        fontWeight: 'bold',
        color: theme.palette.error.main,
      },
    },
  },
}))

function NavFieldset({ legend, routes, current }) {
  return (
    <StyledFieldset>
      <legend>{legend}</legend>
      <div>
        {routes &&
          routes.map((route) => (
            <div
              key={route.path}
              className={
                route.state.alias === current.state.alias ? 'active' : ''
              }
            >
              <StyledNavLink to={route.path}>
                <Typography variant="h4">{route.state.name}</Typography>
              </StyledNavLink>
            </div>
          ))}
      </div>
    </StyledFieldset>
  )
}

NavFieldset.defaultProps = {
  current: null,
}

NavFieldset.propTypes = {
  legend: PropTypes.string.isRequired,
  routes: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string,
      state: PropTypes.shape({
        name: PropTypes.string,
        alias: PropTypes.string,
      }),
    })
  ).isRequired,
  current: PropTypes.shape({
    path: PropTypes.string,
    state: PropTypes.shape({
      name: PropTypes.string,
      alias: PropTypes.string,
    }),
  }),
}

export default NavFieldset
