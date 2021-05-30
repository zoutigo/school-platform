import React from 'react'
import PropTypes from 'prop-types'

import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'

import CardContent from '@material-ui/core/CardContent'

import Avatar from '@material-ui/core/Avatar'

import Typography from '@material-ui/core/Typography'

import { Box } from '@material-ui/core'
import { styled } from '@material-ui/styles'
import randomkey from '../../../../../utils/randomkey'

const StyledCardHeader = styled(CardHeader)(({ theme }) => ({
  background: theme.palette.secondary.main,
  color: 'white',
  height: '3.5rem',
}))

const StyledCardContent = styled(CardContent)(() => ({
  background: 'whitesmoke',
  padding: '0.5rem 1.8rem !important',
}))

const StyledCard = styled(Card)(() => ({
  marginTop: '1rem !important',
  minWidth: '100%',
}))

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.secondary.main,
  marginRight: '1rem !important',
  marginLeft: '2rem !important',
}))

function NewsCard({ cardTitle, items, recipe }) {
  const Title = (title) => <Typography variant="h4">{title}</Typography>
  return (
    <StyledCard>
      <StyledCardHeader
        avatar={<StyledAvatar aria-label="recipe">{recipe}</StyledAvatar>}
        title={Title(cardTitle)}
        // subheader="September 14, 2016"
      />

      <StyledCardContent>
        {items && items.map((item) => <Box key={randomkey(99999)}>{item}</Box>)}
      </StyledCardContent>
    </StyledCard>
  )
}

NewsCard.propTypes = {
  cardTitle: PropTypes.string.isRequired,
  recipe: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.element).isRequired,
}

export default NewsCard
