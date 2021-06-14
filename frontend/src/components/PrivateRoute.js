import React from 'react'
import { useLocation } from 'react-router-dom'

function PrivateRoute() {
  const { pathname } = useLocation()
  return <div>Route privée</div>
}

export default PrivateRoute
