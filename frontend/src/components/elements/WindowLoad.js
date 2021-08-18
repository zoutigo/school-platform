import React, { useEffect } from 'react'
import { useQuery } from 'react-query'
import { useDispatch } from 'react-redux'
import {
  setUrlPrefix,
  setVariables,
} from '../../redux/settings/SettingsActions'
import { apiFetchVariables } from '../../utils/api'

function WindowLoad() {
  const dispatch = useDispatch()

  useEffect(() => {
    const PREFIX =
      process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3500'
    dispatch(setUrlPrefix(PREFIX))
  }, [])

  const { isLoading, isError, data, error } = useQuery(['variables'], () =>
    apiFetchVariables()
  )

  useEffect(() => {
    if (data) {
      dispatch(setVariables(data))
    }
    return () => {
      setVariables(null)
    }
  }, [data])

  // useEffect(() => {
  //   if (newRoutes.length) {
  //     dispatch(setAllRoutes(newRoutes))
  //   }
  //   window.addEventListener('load', loadChemins)
  //   return () => {
  //     window.removeEventListener('load', loadChemins)
  //   }
  // }, [data, newRoutes])

  return null
}

export default WindowLoad
