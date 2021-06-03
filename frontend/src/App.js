import { Grid } from '@material-ui/core'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Header from './components/header/Header'
import { categoriesList, chaptersList, rubricsList } from './constants/rubrics'
import SmallScreenNav from './components/smallscreennav/SmallScreenNav'
import Footer from './components/footer/Footer'
import { setRoutes } from './redux/settings/SettingsActions'
import Main from './components/main/Main'

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
  const dispatch = useDispatch()
  useEffect(() => {
    for (let i = 0; i < rubricsList.length; i += 1) {
      dispatch(setRoutes(rubricsList[i]))
    }
    for (let i = 0; i < categoriesList.length; i += 1) {
      dispatch(setRoutes(categoriesList[i]))
    }
    for (let i = 0; i < chaptersList.length; i += 1) {
      dispatch(setRoutes(chaptersList[i]))
    }
  }, [])
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Grid container>
          <Header />
          <SmallScreenNav />
          <Main />
          <Footer />
        </Grid>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
