import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'
import { setAllRoutes } from '../../redux/settings/SettingsActions'
import { apiFetchChemin } from '../../utils/api'

function WindowLoad() {
  const dispatch = useDispatch()

  const [newRoutes, setNewRoutes] = useState([])
  const { Routes } = useSelector((state) => state.settings)
  const { isLoading, isError, data, error } = useQuery(['liste-chemins'], () =>
    apiFetchChemin()
  )

  const loadChemins = () => {
    if (data && Array.isArray(data) && data.length > 0) {
      setNewRoutes(
        Routes.map((route) => {
          const newRoute = { ...route }
          const match = data.find((chemin) => chemin.path === route.path)
          newRoute.description = match ? match.description : ''
          newRoute.filepath = match ? match.filepath : ''
          return newRoute
        })
      )
    }
  }

  useEffect(() => {
    if (newRoutes.length) {
      dispatch(setAllRoutes(newRoutes))
    }
    window.addEventListener('load', loadChemins)
    return () => {
      window.removeEventListener('load', loadChemins)
    }
  }, [data, newRoutes])

  return null
}

export default WindowLoad
