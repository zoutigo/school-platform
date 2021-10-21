import React from 'react'
import { useSelector } from 'react-redux'

const useIsTokenValid = () => {
  const { User } = useSelector((state) => state.user)
  if (!User) return false

  const { exp, id, isVerified } = User

  // const tokenIsValid = (!exp ? false : exp > new Date().getTime() / 1000) && _id
  const valid = () => {
    if (!exp || !isVerified) return false
    if (exp > new Date().getTime() / 1000 && id) return true
    return false
  }

  const tokenIsValid = valid()
  return tokenIsValid
}

export default useIsTokenValid
