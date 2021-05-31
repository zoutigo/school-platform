import { Grid, styled, Typography } from '@material-ui/core'
import React from 'react'
import PropTypes from 'prop-types'
import { StyledNavLink } from '../../../../elements/styled'

const StyledCardItem = styled(Grid)(({ theme }) => ({
  padding: '0.5rem',
  margin: '1rem rem',
  cursor: 'pointer',

  [theme.breakpoints.down('sm')]: {
    margin: '1rem 0',
  },
  '&:hover': {
    background: theme.palette.primary.light,
  },
}))

function CardItem({ title, detail, link }) {
  return (
    <StyledNavLink to={link}>
      <StyledCardItem container>
        <Grid item xs={12}>
          <Typography variant="body1" component="div">
            {title}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="caption" component="span">
            {detail}
          </Typography>
        </Grid>
      </StyledCardItem>
    </StyledNavLink>
  )
}
CardItem.defaultProps = {
  link: '/',
}

CardItem.propTypes = {
  title: PropTypes.string.isRequired,
  detail: PropTypes.string.isRequired,
  link: PropTypes.string,
}

export default CardItem
