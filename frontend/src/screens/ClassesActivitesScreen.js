import { Grid } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

function ClassesActivitesScreen() {
  const { pathname } = useLocation()
  const { Routes } = useSelector((state) => state.settings)
  const { name } = Routes.find((route) => route.path === pathname)
  return <Grid container> Activité classe de {name}</Grid>
}

export default ClassesActivitesScreen
