import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { setUserInfos, setUserToken } from '../redux/user/UserActions'
import returnStoreAndPersistor from '../redux/store'

function PrivateLoggoutScreen() {
  const dispatch = useDispatch()
  const { persistor } = returnStoreAndPersistor()

  useEffect(() => {
    dispatch(setUserToken(''))
    dispatch(setUserInfos(''))
    persistor.purge()
  }, [])

  return <Redirect to="/login" />
}

export default PrivateLoggoutScreen
