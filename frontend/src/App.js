/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import { Grid } from '@material-ui/core'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import React from 'react'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Main from './components/main/Main'
import WindowLoad from './components/elements/WindowLoad'
import ModalNavigation from './components/elements/ModalNavigation'

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
        <WindowLoad />
        <ModalNavigation />
        <Grid container>
          <Header />
          <Main />
          <Footer />
        </Grid>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default React.memo(App)
