import { Grid } from '@material-ui/core'
import React from 'react'
import { Route } from 'react-router-dom'
import {
  categoriesRoutes,
  chaptersRoutes,
  rubricsRoutes,
} from '../../constants/rubrics'

function BodyBloc() {
  return (
    <Grid container>
      {chaptersRoutes.map((chapterRoute) => (
        <Route {...chapterRoute} key={chapterRoute.path} />
      ))}
      {categoriesRoutes.map((categoryRoute) => (
        <Route {...categoryRoute} key={categoryRoute.path} />
      ))}
      {rubricsRoutes.map((rubricRoute) => (
        <Route {...rubricRoute} key={rubricRoute.path} />
      ))}
    </Grid>
  )
}

export default BodyBloc
