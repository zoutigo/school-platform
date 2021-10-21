/* eslint-disable import/named */
import React, { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { setUserInfos, setUserToken } from '../redux/user/UserActions'
import returnStoreAndPersistor from '../redux/store'
import useRoutesInfos from '../components/hooks/useRoutesInfos'

function PrivateLoggoutScreen() {
  const dispatch = useDispatch()
  const { persistor } = returnStoreAndPersistor()
  const { routesList } = useRoutesInfos()
  const loginRoute = useCallback(
    routesList.find((route) => route.state.alias === 'login'),
    [routesList]
  )

  useEffect(() => {
    dispatch(setUserToken(''))
    dispatch(setUserInfos(''))
    persistor.purge()
  }, [])

  return (
    <Redirect
      to={{
        pathname: '/private/identification/login',
        state: { ...loginRoute.state, from: 'loggout' },
      }}
    />
  )
}

export default PrivateLoggoutScreen
