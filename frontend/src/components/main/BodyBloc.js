import { Grid } from '@material-ui/core'
import { Redirect, Route } from 'react-router-dom'
import React from 'react'
import PropTypes from 'prop-types'
import {
  categoriesRoutes,
  chaptersRoutes,
  rubricsRoutes,
} from '../../constants/rubrics'

import { useRigths } from '../../utils/hooks'

function BodyBloc() {
  const { userLevel, managerLevel, moderatorLevel, adminLevel } = useRigths()

  const UserRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        userLevel ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  )
  UserRoute.propTypes = {
    component: PropTypes.func.isRequired,
  }

  const ModeratorRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        moderatorLevel ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  )
  ModeratorRoute.propTypes = {
    component: PropTypes.func.isRequired,
  }

  const ManagerRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        managerLevel ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  )
  ManagerRoute.propTypes = {
    component: PropTypes.func.isRequired,
  }

  const AdminRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        adminLevel ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  )
  AdminRoute.propTypes = {
    component: PropTypes.func.isRequired,
  }

  const Filter = ({ route }) => {
    switch (route.access) {
      case 'user':
        return <UserRoute {...route} />
      case 'moderator':
        return <ModeratorRoute {...route} />
      case 'manager':
        return <ManagerRoute {...route} />
      case 'admin':
        return <AdminRoute {...route} />

      default:
        return <Route {...route} />
    }
  }

  Filter.propTypes = {
    route: PropTypes.shape({
      access: PropTypes.string,
    }).isRequired,
  }

  return (
    <Grid container>
      {chaptersRoutes.map((chapterRoute) => (
        <Filter route={chapterRoute} key={chapterRoute.path} />
      ))}
      {categoriesRoutes.map((categoryRoute) => (
        <Filter route={categoryRoute} key={categoryRoute.path} />
      ))}
      {rubricsRoutes.map((rubricRoute) => (
        <Filter route={rubricRoute} key={rubricRoute.path} />
      ))}
    </Grid>
  )
}

export default BodyBloc
