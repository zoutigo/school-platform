/* eslint-disable import/named */
import React from 'react'
import { Redirect } from 'react-router-dom'
import { useRigths } from '../utils/hooks'

function PrivateScreen() {
  const { userLevel } = useRigths()
  if (userLevel) return <Redirect to="/private/account" />
  return <Redirect to="/private/identification/login" />
}

export default PrivateScreen
