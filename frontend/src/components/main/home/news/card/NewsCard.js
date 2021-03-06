import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import MenuBookIcon from '@material-ui/icons/MenuBook'
import DateRangeIcon from '@material-ui/icons/DateRange'
import AttachFileIcon from '@material-ui/icons/AttachFile'

import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'

import CardContent from '@material-ui/core/CardContent'

import Avatar from '@material-ui/core/Avatar'

import Typography from '@material-ui/core/Typography'

import { Box, useTheme } from '@material-ui/core'
import { styled } from '@material-ui/styles'
import randomkey from '../../../../../utils/randomkey'

const StyledCardHeader = styled(CardHeader)(({ theme }) => ({
  background: theme.palette.secondary.main,
  color: 'white',
  height: '3.5rem',
}))

const StyledCardContent = styled(CardContent)(({ bgcolor }) => ({
  background: bgcolor,
  padding: '0.5rem 1.8rem ',
}))

const StyledCard = styled(Card)(({ theme, bgcolor }) => ({
  background: bgcolor,
  marginTop: '1rem',
  width: '93%',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}))

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.secondary.main,
  marginRight: '1rem ',
  marginLeft: '2rem ',
}))

function NewsCard({ cardTitle, items }) {
  const theme = useTheme()
  const defineIcon = useCallback((cardtitle) => {
    switch (cardtitle) {
      case "Activités de l'école":
        return <MenuBookIcon />

      case 'Agenda à venir':
        return <DateRangeIcon />

      case 'Documents récents':
        return <AttachFileIcon />

      default:
        return null
    }
  }, [])

  const Title = useCallback(
    (title) => <Typography variant="h4">{title}</Typography>,
    []
  )
  // const Title = (title) => <Typography variant="h4">{title}</Typography>
  return (
    <StyledCard>
      <StyledCardHeader
        // avatar={<StyledAvatar aria-label="recipe">{recipe}</StyledAvatar>}
        avatar={
          <StyledAvatar aria-label="recipe">
            {defineIcon(cardTitle)}
          </StyledAvatar>
        }
        title={Title(cardTitle)}
        // subheader="September 14, 2016"
      />

      <StyledCardContent
        bgcolor={items.length > 0 ? 'whitesmoke' : theme.palette.error.light}
      >
        {items && items.length > 0 ? (
          items.map((item) => <Box key={randomkey(99999)}>{item}</Box>)
        ) : (
          <Box>
            <Typography variant="body1" component="div">
              Rien pour le moment
            </Typography>
          </Box>
        )}
      </StyledCardContent>
    </StyledCard>
  )
}

NewsCard.propTypes = {
  cardTitle: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.element).isRequired,
}

export default React.memo(NewsCard)
