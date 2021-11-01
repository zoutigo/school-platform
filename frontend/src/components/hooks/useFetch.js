import React from 'react'
import PropTypes from 'prop-types'
import { useQuery } from 'react-query'
import getError from '../../utils/getError'

function useFetch(queryKey, queryParams, fetcher) {
  const { isLoading, isError, error, data } = useQuery(queryKey, () =>
    fetcher(queryParams)
  )
  const errorMessage = error ? getError(error) : null
  return { isLoading, isError, errorMessage, data }
}

useFetch.propTypes = {
  queryKey: PropTypes.arrayOf(PropTypes.string),
  queryParams: PropTypes.string,
}

export default useFetch
