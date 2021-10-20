import React from 'react'
import { useMutation } from 'react-query'
import { apiLogin } from '../../utils/api'
import useMutationOptions from './useMutationOptions'

function useLogin() {
  const { mutateAsync, isLoading: isMutating } = useMutation(
    apiLogin,
    useMutationOptions(['login'])
  )
  return { mutateAsync, isMutating }
}

export default useLogin
