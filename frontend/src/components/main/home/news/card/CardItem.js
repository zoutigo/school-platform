import { Grid, styled, Typography } from '@material-ui/core'
import React from 'react'
import PropTypes from 'prop-types'

const StyledCardItem = styled(Grid)(() => ({
  padding: '1rem !important',
}))

function CardItem({ title, detail }) {
  return (
    <StyledCardItem container>
      <Grid item xs={12}>
        {' '}
        <Typography variant="body1" component="div">
          {' '}
          {title}
        </Typography>{' '}
      </Grid>
      <Grid item xs={12}>
        <Typography variant="caption" component="span">
          {detail}
        </Typography>
      </Grid>
    </StyledCardItem>
  )
}

CardItem.propTypes = {
  title: PropTypes.string.isRequired,
  detail: PropTypes.string.isRequired,
}

export default CardItem
