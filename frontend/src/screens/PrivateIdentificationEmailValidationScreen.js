import React from 'react'
import { useParams } from 'react-router-dom'

function PrivateIdentificationEmailValidationScreen() {
  const { token } = useParams()

  return <h1>{token === ':token' ? 'salut' : 'welcome'}</h1>
}

export default PrivateIdentificationEmailValidationScreen
