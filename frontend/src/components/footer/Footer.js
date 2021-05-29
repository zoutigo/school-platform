import React from 'react'
import { Grid, styled } from '@material-ui/core'
import Contact from './Contact'
import Timing from './Timing'

import Partners from './Partners'
import FooterLogo from './FooterLogo'
import Copyrights from './Copyrights'
import Suggestions from './Suggestions'
import FooterCard from './card/FooterCard'
import Share from './Share'

const StyledFooterInfos = styled(Grid)(({ theme }) => ({
  background: theme.palette.secondary.main,
  minHeight: '5vh',
  minWwidth: '100vw',
  overflow: 'hidden',
  padding: '2rem 4rem !important',
  color: 'white',
}))

function Footer() {
  return (
    <footer>
      <StyledFooterInfos container>
        <Grid item container xs={12} sm={6} md={4} justify="center">
          <Contact />
        </Grid>
        <Grid item xs={12} sm={6} md={4} container justify="center">
          <Suggestions />
        </Grid>
        <Grid item xs={12} sm={6} md={4} container justify="center">
          <Partners />
        </Grid>
        <Grid item xs={12} sm={6} md={4} container justify="center">
          <Timing />
        </Grid>
        <Grid item xs={12} sm={6} md={4} container justify="center">
          <Share />
        </Grid>
        <Grid item xs={12} sm={6} md={4} container justify="center">
          <FooterCard items={[<FooterLogo key="footerlogo" />]} title="" />
        </Grid>
      </StyledFooterInfos>
      <Grid item container>
        <Copyrights />
      </Grid>
    </footer>
  )
}

export default Footer
