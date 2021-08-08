import React from 'react'
import { Redirect } from 'react-router-dom'

function PrivateIdentificationScreen() {
  return <Redirect to="/private/identification/login" />
}

export default PrivateIdentificationScreen
