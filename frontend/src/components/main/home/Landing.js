import React from 'react'
import { Grid, styled, Typography } from '@material-ui/core'
import media from '../../../assets/videos/landing.mp4'

const StyledLandingContainer = styled(Grid)(({ theme }) => ({
  minHeight: '40vh',
  position: 'relative',
  background: 'green',

  [theme.breakpoints.up('lg')]: {
    minHeight: '98vh',
  },

  [theme.breakpoints.between('md', 'lg')]: {
    minHeight: '93vh',
  },
  [theme.breakpoints.between('sm', 'md')]: {
    minHeight: '65vh',
  },
  [theme.breakpoints.between('xs', 'sm')]: {
    minHeight: '50vh',
  },
  [theme.breakpoints.down('xs')]: {
    minHeight: '40vh',
  },
}))

const StyledVideo = styled('video')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    height: '100%',
    width: '100%',
    objectFit: 'cover',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  [theme.breakpoints.down('md')]: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    objectFit: 'cover',
    top: 0,
    left: 0,
    right: 0,
  },
}))

const StyledTypo = styled(Typography)(({ theme }) => ({
  fontSize: '12rem',
  fontWeight: 900,
  textTransform: 'uppercase',
  lineHeight: 1,
  WebkitTextStroke: `2px ${theme.palette.secondary.main}`,
  opacity: 0.7,
  color: 'transparent',
  marginLeft: '100px !important',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  backgroundImage: `linear-gradient(to bottom, transparent 50%, ${theme.palette.secondary.main} 50%)`,
  transition: 'background-position ease-out 0.4s',
  backgroundSize: '1% 200%',
  '&:hover': {
    backgroundPosition: '0% -100%',
  },
  [theme.breakpoints.up('lg')]: {
    fontSize: '15rem',
  },
  [theme.breakpoints.between('md', 'lg')]: {
    fontSize: '6rem',
    marginLeft: '10vw !important',
    marginTop: '6rem !important',
  },
  [theme.breakpoints.between('sm', 'md')]: {
    fontSize: '5rem',
    marginLeft: '10vw !important',
    marginTop: '4rem !important',
  },
  [theme.breakpoints.between('xs', 'sm')]: {
    fontSize: '3rem',
    marginLeft: '10vw !important',
    marginTop: '3rem !important',
  },
}))

const StyledTextBox = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: '10rem',
  [theme.breakpoints.up('sm')]: {
    top: '1rem',
  },
  [theme.breakpoints.between('xs', 'sm')]: {
    top: '1rem',
  },
  [theme.breakpoints.down('xs')]: {
    display: 'none',
  },
}))
function Landing() {
  return (
    <StyledLandingContainer container article="landing">
      <StyledVideo src={media} autoPlay muted loop />
      <StyledTextBox>
        <StyledTypo variant="h1">ECOLE</StyledTypo>
        <StyledTypo variant="h1">SAINT AUGUSTIN</StyledTypo>
        <StyledTypo variant="h1">Crémieu</StyledTypo>
      </StyledTextBox>
    </StyledLandingContainer>
  )
}

export default Landing
