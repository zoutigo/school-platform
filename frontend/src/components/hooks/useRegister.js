import React from 'react'
import { useMutation } from 'react-query'
import { apiRegister } from '../../utils/api'
import useMutationOptions from './useMutationOptions'

const useRegister = () => {
  const { mutateAsync, isLoading: isMutating } = useMutation(
    apiRegister,
    useMutationOptions(['register'])
  )
  return {
    mutateAsync,
  }
}

export default useRegister
