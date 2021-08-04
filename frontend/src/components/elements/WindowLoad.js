import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setUrlPrefix } from '../../redux/settings/SettingsActions'

function WindowLoad() {
  const dispatch = useDispatch()

  useEffect(() => {
    const PREFIX =
      process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3500'
    dispatch(setUrlPrefix(PREFIX))
  }, [])

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
