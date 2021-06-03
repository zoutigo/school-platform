import React from 'react'
import { Route } from 'react-router-dom'
import {
  categoriesRoutes,
  chaptersRoutes,
  rubricsRoutes,
} from '../../constants/rubrics'

function BodyBloc() {
  return (
    <div>
      {chaptersRoutes.map((chapterRoute) => (
        <Route {...chapterRoute} key={chapterRoute.path} />
      ))}
      {categoriesRoutes.map((categoryRoute) => (
        <Route {...categoryRoute} key={categoryRoute.path} />
      ))}
      {rubricsRoutes.map((rubricRoute) => (
        <Route {...rubricRoute} key={rubricRoute.path} />
      ))}
    </div>
  )
}

export default BodyBloc
