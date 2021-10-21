import React from 'react'
import { useMutation } from 'react-query'
import useMutationOptions from './useMutationOptions'

function useMutate(queryKey, mutator) {
  const {
    mutateAsync,
    isLoading: isMutating,
    isSuccess: mutationIsSuccessfull,
  } = useMutation(mutator, useMutationOptions(queryKey))
  return { mutateAsync, isMutating, mutationIsSuccessfull }
}

export default useMutate
