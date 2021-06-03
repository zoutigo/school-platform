import { Grid } from '@material-ui/core'
import React from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

function ClassesPresentationScreen() {
  const { pathname } = useLocation()
  const { Routes } = useSelector((state) => state.settings)
  const { name } = Routes.find((route) => route.path === pathname)
  return <Grid container> Presantion classe de {name}</Grid>
}

export default ClassesPresentationScreen
