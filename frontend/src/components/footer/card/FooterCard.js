import React from 'react'
import PropTypes from 'prop-types'

import { styled } from '@material-ui/styles'
import { Grid, Typography } from '@material-ui/core'
import randomkey from '../../../utils/randomkey'

const StyledFooterCard = styled(Grid)(({ theme }) => ({
  background: 'transparent',
  paddingBottom: '1.2rem !important',
  width: '380px',
  [theme.breakpoints.down('md')]: {
    paddingBottom: '0.2rem !important',
  },
}))
const StyledFooterCardHead = styled(Grid)(() => ({
  background: 'transparent',
}))
const StyledFooterCardBody = styled(Grid)(() => ({
  background: 'transparent',
  display: 'flex',
  flexDirection: 'column',
}))

function FooterCard({ title, items }) {
  return (
    <StyledFooterCard item container>
      <StyledFooterCardHead item>
        <Typography variant="h3">{title}</Typography>
      </StyledFooterCardHead>
      <StyledFooterCardBody item container>
        {items &&
          items.map((item) => (
            <Grid item key={randomkey(98765)}>
              {item}
            </Grid>
          ))}
      </StyledFooterCardBody>
    </StyledFooterCard>
  )
}

FooterCard.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      link: PropTypes.string,
    })
  ).isRequired,
}

export default FooterCard
