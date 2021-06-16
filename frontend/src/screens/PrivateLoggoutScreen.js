import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { setUserInfos, setUserToken } from '../redux/user/UserActions'

function PrivateLoggoutScreen() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setUserToken(''))
    dispatch(setUserInfos(''))
  }, [])

  return <Redirect to="/login" />
}

export default PrivateLoggoutScreen
