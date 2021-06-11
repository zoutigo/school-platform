// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import { useQueryClient } from 'react-query'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

export const useCurrentCategory = () => {
  const { pathname } = useLocation()
  const [categoryDatas, setCategoryDatas] = useState(null)
  const [chapters, setChapters] = useState(null)

  const [currentRoute, setCurrentRoute] = useState(null)
  const { Routes } = useSelector((state) => state.settings)

  useEffect(() => {
    const Route = Routes.find((route) => pathname === route.path)
    setCurrentRoute(Route)
  }, [pathname])

  useEffect(() => {
    if (currentRoute && currentRoute.type === 'category') {
      setCategoryDatas(currentRoute)
      setChapters(
        Routes.filter(
          (route) =>
            route.type === 'chapter' && route.path.includes(currentRoute.path)
        )
      )
    } else if (currentRoute && currentRoute.type === 'rubric') {
      setCategoryDatas(null)
    } else {
      const categoryAlias = pathname.split('/')[2]
      const categoryInfos = Routes.find(
        (route) => route.alias === categoryAlias && route.type === 'category'
      )
      if (categoryInfos) {
        setCategoryDatas(categoryInfos)
        setChapters(
          Routes.filter(
            (route) =>
              route.type === 'chapter' &&
              route.path.includes(categoryInfos.path)
          )
        )
      }
    }

    return () => {
      setCategoryDatas(null)
      // setChapters(null)
    }
  }, [currentRoute, pathname])

  return {
    ...categoryDatas,
    chapters: chapters,
    currentRoute: currentRoute,
  }
}

export const useUpdateMutationOptions = (queryKey) => {
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
      queryClient.setQueryData(queryKey, (prev) => newData)
    },
    // eslint-disable-next-line no-unused-vars
    onError: (error, variables, context, newData, rollback) => {
      // dispatch(setMutationError(error.message))
      // rollback()
      queryClient.setQueryData(queryKey, (prev) => prev)
    },
    onSettled: () => {
      queryClient.invalidateQueries(queryKey)
    },
  }
}
