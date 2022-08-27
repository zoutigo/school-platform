import React, { useEffect } from 'react'
import { useQuery } from 'react-query'
import { useDispatch } from 'react-redux'
import { useCookies } from 'react-cookie'

import {
  setChemins,
  setUrlPrefix,
  setVariables,
} from '../../redux/settings/SettingsActions'
import { apiFetchChemin, apiFetchVariables } from '../../utils/api'

function WindowLoad() {
  const dispatch = useDispatch()
  const [cookies, setCookie, removeCookie] = useCookies(['appversion'])

  useEffect(() => {
    const PREFIX =
      process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3500'
    dispatch(setUrlPrefix(PREFIX))
  }, [])

  const { data: variablesData } = useQuery(['variables'], () =>
    apiFetchVariables()
  )
  const { data: chemins } = useQuery(['liste-chemins'], () => apiFetchChemin())
  // const { data: chemins } = useQuery(['liste-cartes'], () => apiFetchCards())

  useEffect(() => {
    if (variablesData) {
      const { version } = variablesData
      if (cookies.appversion !== version) {
        localStorage.removeItem('persist:root')
        setCookie('appversion', version, { path: '/' })
      }

      dispatch(setVariables(variablesData))
    }
    return () => {
      setVariables(null)
    }
  }, [variablesData])

  useEffect(() => {
    if (chemins && Array.isArray(chemins)) {
      dispatch(setChemins(chemins))
    }
    return () => {
      setChemins(null)
    }
  }, [chemins])

  return null
}

export default WindowLoad
