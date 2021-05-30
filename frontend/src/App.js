import { Grid } from '@material-ui/core'
import { BrowserRouter, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import React from 'react'
import Header from './components/header/Header'
import HomeScreen from './screens/HomeScreen'
import {
  categoriesRoutes,
  chaptersRoutes,
  rubricsRoutes,
} from './constants/rubrics'
import SmallScreenNav from './components/smallscreennav/SmallScreenNav'
import Footer from './components/footer/Footer'
import { StyledMainApp } from './components/elements/styled'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      retry: 1,
      retryDelay: 500,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
          <Footer />
        </Grid>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
