// eslint-disable-next-line no-unused-vars
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { setAllRoutes } from '../redux/settings/SettingsActions'
import { apiFetchChemin } from './api'
import randomkey from './randomkey'
import routeDatas from './routeDatas'

const initialRouteDatas = {
  rubric: null,
  rubricCategories: [],
  categories: [],
  category: null,
  current: null,
  chapters: [],
  rubrics: [],
  categoryAlias: null,
}

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

export const useIsTokenValid = () => {
  const {
    User: { exp, _id, isVerified },
  } = useSelector((state) => state.user)

  // const tokenIsValid = (!exp ? false : exp > new Date().getTime() / 1000) && _id
  const valid = () => {
    if (!exp || !isVerified) return false
    if (exp > new Date().getTime() / 1000 && _id) return true
    return false
  }
  const tokenIsValid = valid()
  return { tokenIsValid }
}

export const useRigths = () => {
  const {
    User: { isAdmin, isModerator, isManager, isTeacher, exp },
  } = useSelector((state) => state.user)

  const TokenIsValid = new Date().getTime() / 1000 < exp

  const userLevel = TokenIsValid
  const teacherLevel =
    (isAdmin || isManager || isModerator || isTeacher) && TokenIsValid
  const managerLevel = (isAdmin || isManager) && TokenIsValid
  const adminLevel = isAdmin && TokenIsValid
  const moderatorLevel = (isAdmin || isManager || isModerator) && TokenIsValid

  return { userLevel, teacherLevel, managerLevel, adminLevel, moderatorLevel }
}

export const useRouteParams = (arg) => {
  const useQueryP = () => new URLSearchParams(useLocation().search)
  const query = useQueryP()

  return query.get(arg)
}

export const useRouteDatas = () => {
  const { pathname } = useLocation()
  const { Routes } = useSelector((state) => state.settings)
  const [datas, setDatas] = useState(initialRouteDatas)

  useEffect(() => {
    const values = routeDatas(pathname, Routes)
    setDatas(values)
    return () => {
      setDatas(null)
    }
  }, [pathname])

  return { ...datas }
}
