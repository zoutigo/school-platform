import React from 'react'
import { useDispatch } from 'react-redux'
import {
  errorAlertCollapse,
  initialAlertCollapse,
  loadingAlertCollapse,
} from '../../constants/alerts'

function useFetchDispatch(isLoading, isError, error, data, action) {
  const dispatch = useDispatch()

  React.useEffect(() => {
    const alert = () => {
      let value
      if (isLoading) value = loadingAlertCollapse
      if (data) {
        value = initialAlertCollapse
      }
      if (isError) {
        if (error.response.status === 404) {
          value = errorAlertCollapse(
            "Il n'y a pas d'enregistrement pour le moment"
          )
        } else {
          value = errorAlertCollapse(error.response.data.message)
        }
      }
      return value
    }

    dispatch(action(alert()))
    // return () => {
    //   dispatch(action(initialAlertCollapse))
    // }
  }, [isLoading, isError, data, error])

  return null
}

export default useFetchDispatch
