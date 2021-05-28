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

function App() {
  return (
    <BrowserRouter>
      <Grid container>
        <Header />
        <StyledMainApp>
          {chaptersRoutes.map((chapterRoute) => (
            <Route {...chapterRoute} />
          ))}
          {categoriesRoutes.map((categoryRoute) => (
            <Route {...categoryRoute} />
          ))}
          {rubricsRoutes.map((rubricRoute) => (
            <Route {...rubricRoute} />
          ))}
          <Route path="/" component={HomeScreen} exact />
        </StyledMainApp>
        <footer>The footer</footer>
      </Grid>
    </BrowserRouter>
  )
}

export default App
