import { Grid } from '@material-ui/core'
import { BrowserRouter } from 'react-router-dom'
import React from 'react'
import Header from './components/header/Header'
import logo from './logo.svg'

function App() {
  return (
    <BrowserRouter>
      <Grid container>
        <Header />
        <main>The main</main>
        <footer>The footer</footer>
      </Grid>
    </BrowserRouter>
  )
}

export default App
