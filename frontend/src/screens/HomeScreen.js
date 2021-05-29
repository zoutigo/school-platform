import React from 'react'
import { StyledCentralScreen } from '../components/elements/styled'
import Landing from '../components/main/home/Landing'

function HomeScreen() {
  return (
    <StyledCentralScreen location="home">
      <Landing />
      <article>Introduction</article>
      <article>Popular Rubrics</article>
      <article>Figures</article>
      <article>News</article>
    </StyledCentralScreen>
  )
}

export default HomeScreen
