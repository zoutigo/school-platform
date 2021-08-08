import React from 'react'
import { Redirect } from 'react-router-dom'

function PrivateAdminScreen() {
  return <Redirect to="/private/administration/parametres" />
}

export default PrivateAdminScreen
