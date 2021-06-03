import React from 'react'
import { Grid } from '@material-ui/core'
import Introduction from '../components/main/home/Introduction'
import Landing from '../components/main/home/Landing'
import PopularRubrics from '../components/main/home/PopularRubrics'
import Figures from '../components/main/home/figures/Figures'
import News from '../components/main/home/news/News'

function HomeScreen() {
  return (
    <Grid container location="home">
      <Landing />
      <Introduction />
      <PopularRubrics />
      <Figures />
      <News />
    </Grid>
  )
}

export default HomeScreen
