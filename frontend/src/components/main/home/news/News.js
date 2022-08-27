import { Grid, styled, Typography } from '@material-ui/core'
import { useLocation } from 'react-router-dom'
import React from 'react'
import { StyledHomeGrid } from '../../../elements/styled'
import NewsActivites from './NewsActivites'
import NewsAgenda from './NewsAgenda'
import NewsDocs from './NewsDocs'
import NewsInfosParents from './NewsInfosParents'
import NewsAlbums from './NewsAlbums'

const StyledNewsContainer = styled(StyledHomeGrid)(({ theme }) => ({
  background: theme.palette.primary.main,
  [theme.breakpoints.down('sm')]: {
    padding: '2rem 0 !important',
  },
}))

const StyledMessage = styled(Typography)(({ theme }) => ({
  fontFamily: "'Swanky and Moo Moo', cursive;",
  fontSize: '3.5rem',
  color: theme.palette.secondary.main,
  [theme.breakpoints.between('sm', 'md')]: {
    fontSize: '3rem',
  },
  [theme.breakpoints.between('xs', 'sm')]: {
    fontSize: '2.5rem',
  },
  [theme.breakpoints.down('xs')]: {
    fontSize: '2rem',
  },
}))

const StyledMessageContainer = styled(Grid)(() => ({
  padding: '0px 1rem ! important',
  textAlign: 'center',
}))

const StyledCardContainer = styled(Grid)(() => ({
  // padding: '0rem 1rem !important',
}))

function News() {
  const { pathname } = useLocation()
  const message =
    pathname === '/'
      ? "Restez connectés à l'actu de l'école."
      : 'Informations récentes'
  return (
    <StyledNewsContainer container>
      <StyledMessageContainer
        item
        container
        xs={12}
        xl={12}
        justifyContent="center"
      >
        <StyledMessage component="div">{message}</StyledMessage>
      </StyledMessageContainer>

      {pathname !== '/' && (
        <StyledCardContainer
          item
          md={12}
          lg={4}
          container
          justifyContent="center"
        >
          <NewsInfosParents />
        </StyledCardContainer>
      )}
      <StyledCardContainer
        item
        md={12}
        lg={4}
        container
        justifyContent="center"
      >
        <NewsActivites />
      </StyledCardContainer>
      <StyledCardContainer
        item
        md={12}
        lg={4}
        container
        justifyContent="center"
      >
        <NewsDocs />
      </StyledCardContainer>
      <StyledCardContainer
        item
        md={12}
        lg={4}
        container
        justifyContent="center"
      >
        <NewsAgenda />
      </StyledCardContainer>
      {pathname !== '/' && (
        <StyledCardContainer
          item
          md={12}
          lg={4}
          container
          justifyContent="center"
        >
          <NewsAlbums />
        </StyledCardContainer>
      )}
    </StyledNewsContainer>
  )
}

export default News
