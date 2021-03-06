/* eslint-disable import/named */
import { Grid } from '@material-ui/core'
import { Redirect, Route } from 'react-router-dom'

import React, { useCallback } from 'react'
import PropTypes from 'prop-types'

import routesComponents from '../../constants/routesComponents'
import useRigths from '../hooks/useRigths'
import useRoutesInfos from '../hooks/useRoutesInfos'

function BodyBloc() {
  const { userLevel, managerLevel, moderatorLevel, adminLevel } = useRigths()

  const loginPath = useCallback('/private/identification/login', [])
  const { routesList } = useRoutesInfos()

  const routesComposed = useCallback(() => {
    const list = routesList.map((route) => {
      const data = routesComponents.find((value) => value.path === route.path)
      const newroute = { ...route }
      if (data) {
        newroute.component = data.component
      }
      return newroute
    })

    return list
  }, [])

  const UserRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        userLevel ? <Component {...props} /> : <Redirect to={loginPath} />
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
        moderatorLevel ? <Component {...props} /> : <Redirect to={loginPath} />
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
        managerLevel ? <Component {...props} /> : <Redirect to={loginPath} />
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
        adminLevel ? <Component {...props} /> : <Redirect to={loginPath} />
      }
    />
  )
  AdminRoute.propTypes = {
    component: PropTypes.shape({
      component: PropTypes.element,
    }).isRequired,
  }

  const Filter = React.memo((props) => {
    const { state } = props
    switch (state.access) {
      case 'user':
        return <UserRoute {...props} />
      case 'moderator':
        return <ModeratorRoute {...props} />
      case 'manager':
        return <ManagerRoute {...props} />
      case 'admin':
        return <AdminRoute {...props} />
      case 'public':
        return <Route {...props} />

      default:
        return <Route {...props} />
    }
  })

  Filter.propTypes = {
    state: PropTypes.shape({
      access: PropTypes.string,
    }).isRequired,
  }

  return (
    <Grid container>
      {routesComposed().map((element) => {
        const { path, exact, component, ...rest } = element
        const route = { path, exact, component }
        return <Filter {...route} {...rest} key={element.path} />
      })}
    </Grid>
  )
}

export default React.memo(BodyBloc)
