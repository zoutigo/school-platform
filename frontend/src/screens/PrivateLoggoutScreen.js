import React from 'react'
import { Redirect } from 'react-router-dom'

function PrivateLoggoutScreen() {
  return <Redirect to="/login" />
}

export default PrivateLoggoutScreen
