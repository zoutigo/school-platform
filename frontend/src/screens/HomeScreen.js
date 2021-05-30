import React from 'react'
import { StyledCentralScreen } from '../components/elements/styled'
import Introduction from '../components/main/home/Introduction'
import Landing from '../components/main/home/Landing'
import PopularRubrics from '../components/main/home/PopularRubrics'
import Figures from '../components/main/home/figures/Figures'

function HomeScreen() {
  return (
    <StyledCentralScreen location="home">
      <Landing />
      <Introduction />
      <PopularRubrics />
      <Figures />
      <article>News</article>
    </StyledCentralScreen>
  )
}

export default HomeScreen
