/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import { Grid, useMediaQuery, useTheme } from '@material-ui/core'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Header from './components/header/Header'
import SmallScreenNav from './components/smallscreennav/SmallScreenNav'
import Footer from './components/footer/Footer'
import Main from './components/main/Main'
import WindowLoad from './components/elements/WindowLoad'
import { openSmallScreenNav } from './redux/settings/SettingsActions'
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
  const dispatch = useDispatch()
  const theme = useTheme()
  const { SmallScreenNavIsOpened } = useSelector((state) => state.settings)

  const matches = useMediaQuery(theme.breakpoints.down('md'))
  useEffect(() => {
    dispatch(openSmallScreenNav(matches))
    return () => {
      openSmallScreenNav(false)
    }
  }, [matches])

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
