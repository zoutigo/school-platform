import { Grid } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

function ClassesClassroomModelScreen() {
  const { pathname } = useLocation()
  const { Routes } = useSelector((state) => state.settings)
  const currentRoute = Routes.find((route) => route.path === pathname)

  console.log('current:', currentRoute)
  return <Grid container> Infrastructures</Grid>
}

export default ClassesClassroomModelScreen
