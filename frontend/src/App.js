import { Grid } from '@material-ui/core'
import { BrowserRouter, Route } from 'react-router-dom'
import React from 'react'
import Header from './components/header/Header'
import { StyledMainApp } from './components/elements/styled'
import HomeScreen from './screens/HomeScreen'
import {
  categoriesRoutes,
  chaptersRoutes,
  rubricsRoutes,
} from './constants/rubrics'
import SmallScreenNav from './components/smallscreennav/SmallScreenNav'

function App() {
  return (
    <BrowserRouter>
      <Grid container>
        <Header />
        <SmallScreenNav />
        <StyledMainApp>
          {chaptersRoutes.map((chapterRoute) => (
            <Route {...chapterRoute} key={chapterRoute.path} />
          ))}
          {categoriesRoutes.map((categoryRoute) => (
            <Route {...categoryRoute} key={categoryRoute.path} />
          ))}
          {rubricsRoutes.map((rubricRoute) => (
            <Route {...rubricRoute} key={rubricRoute.path} />
          ))}
          <Route path="/" component={HomeScreen} exact />
        </StyledMainApp>
        <footer>The footer</footer>
      </Grid>
    </BrowserRouter>
  )
}

export default App
