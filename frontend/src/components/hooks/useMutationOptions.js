import React from 'react'
import { useQueryClient } from 'react-query'

function useMutationOptions(queryKey) {
  const queryClient = useQueryClient()
  return {
    onMutate: (newData) => {
      queryClient.cancelQueries(queryKey)

      const current = queryClient.getQueryData(queryKey)

      // eslint-disable-next-line no-unused-vars
      queryClient.setQueryData(queryKey, (prev) => newData)

      // in case there is no id , for post, it could be
      // queryCache.setQueryData(name, (prev)=> [...prev, {...newData, id:new Date().toISOString()}])
      return current
    },
    onSuccess: (newData) => {
      // eslint-disable-next-line no-unused-vars
      window.scrollTo(0, 0)
      queryClient.setQueryData(queryKey, (prev) => newData)
    },
    // eslint-disable-next-line no-unused-vars
    onError: (error, variables, context, newData, rollback) => {
      // dispatch(setMutationError(error.message))
      // rollback()
      window.scrollTo(0, 0)
      queryClient.setQueryData(queryKey, (prev) => prev)
    },
    onSettled: () => {
      queryClient.invalidateQueries(queryKey)
    },
  }
}

export default useMutationOptions
