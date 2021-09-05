// eslint-disable-next-line no-unused-vars
import { useTheme } from '@material-ui/styles'
import React, { useCallback, useState } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import routes from '../constants/routes'
import theme from '../constants/theme'

import { apiFetchChemin } from './api'
import randomkey from './randomkey'
import routeDatas from './routeDatas'
import routesInfos from './routesInfos'

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
    User: { exp, id, isVerified },
  } = useSelector((state) => state.user)

  // const tokenIsValid = (!exp ? false : exp > new Date().getTime() / 1000) && _id
  const valid = () => {
    if (!exp || !isVerified) return false
    if (exp > new Date().getTime() / 1000 && id) return true
    return false
  }
  const tokenIsValid = valid()
  return { tokenIsValid }
}

export const useRigths = () => {
  const { User } = useSelector((state) => state.user)

  const setRigths = useCallback(() => {
    const { isAdmin, isModerator, isManager, isTeacher, exp, id } = User
    const TokenIsValid = exp && id ? new Date().getTime() / 1000 < exp : false

    const userLevel = TokenIsValid
    const teacherLevel =
      TokenIsValid && (isAdmin || isManager || isModerator || isTeacher)
    const managerLevel = TokenIsValid && (isAdmin || isManager)
    const adminLevel = TokenIsValid && isAdmin
    const moderatorLevel = TokenIsValid && (isAdmin || isManager || isModerator)
    return { userLevel, teacherLevel, managerLevel, adminLevel, moderatorLevel }
  }, [User])

  return { ...setRigths() }
}

export const useRouteParams = (arg) => {
  const useQueryP = () => new URLSearchParams(useLocation().search)
  const query = useQueryP()

  return query.get(arg)
}

export const useRoutesInfos = () => {
  const { User } = useSelector((state) => state.user)
  const { Chemins: chemins } = useSelector((state) => state.settings)
  const { isAdmin, isModerator, isManager, isTeacher, exp, id } = User
  const TokenIsValid = exp && id ? new Date().getTime() / 1000 < exp : false

  const { pathname } = useLocation()
  const rights = useRigths()

  // routes list

  const routesList = useCallback(() => {
    const list = []
    routes.map((rubricroute) => {
      const rubricmatch =
        chemins && chemins.find((chemin) => rubricroute.path === chemin.path)
      const {
        state: rubricstate,
        routes: categoryroutes,
        ...rubricrest
      } = rubricroute

      if (rubricmatch) {
        rubricstate.description = rubricmatch.description
        rubricstate.filename = rubricmatch.files[0].filename
        rubricstate.filepath = rubricmatch.files[0].filepath
      }
      list.push({ state: { ...rubricstate }, ...rubricrest })

      if (categoryroutes && categoryroutes.length) {
        categoryroutes.map((categoryroute) => {
          const categorymatch = chemins?.find(
            (chemin) => categoryroute.path === chemin.path
          )
          const {
            state: categorystate,
            routes: chaptersroutes,
            ...categoryrest
          } = categoryroute

          if (categorymatch) {
            categorystate.description = categorymatch.description
            categorystate.filename = categorymatch.files[0].filename
            categorystate.filepath = categorymatch.files[0].filepath
          }

          list.push({ state: { ...categorystate }, ...categoryrest })
          if (chaptersroutes && chaptersroutes.length) {
            chaptersroutes.map((chapterroute) => {
              const chaptermatch = chemins?.find(
                (chemin) => chapterroute.path === chemin.path
              )
              const { state: chapterstate, ...chapterrest } = chapterroute

              if (chaptermatch) {
                chapterstate.description = chaptermatch.description
                chapterstate.filename = chaptermatch.files[0].filename
                chapterstate.filepath = chaptermatch.files[0].filepath
              }

              list.push({ state: { ...chapterstate }, ...chapterrest })
              return null
            })
          }
          return null
        })
      }
      return null
    })
    return list
  }, [pathname, chemins])

  const rubricsListe = useCallback(() => {
    const visitorExcludedCats = ['account', 'administration']
    const userExcludedCats = ['identification', 'administration']
    const moderatorExcludedCats = ['administration', 'identification']

    const rubrics = routesList().filter(
      (route) => route.state.type === 'rubric'
    )
    const categories = routesList().filter((route) => {
      const catCond = route.state.type === 'category'

      // const visitorCond =
      //   !rights.userLevel && !visitorExcludedCats.includes(route.state.alias)
      const visitorCond = !TokenIsValid && route.state.access === 'public'

      // const userCond =
      //   rights.userLevel && !userExcludedCats.includes(route.state.alias)

      const userCond =
        TokenIsValid &&
        (route.state.access === 'public' || route.state.access === 'user')

      // const moderatorCond =
      //   rights.moderatorLevel &&
      //   !moderatorExcludedCats.includes(route.state.alias)
      const moderatorCond =
        TokenIsValid &&
        (route.state.access === 'public' ||
          route.state.access === 'user' ||
          route.state.access === 'moderator')

      const managerCond =
        TokenIsValid &&
        (route.state.access === 'public' ||
          route.state.access === 'user' ||
          route.state.access === 'moderator' ||
          route.state.access === 'manager')

      const adminCond =
        TokenIsValid &&
        (route.state.access === 'public' ||
          route.state.access === 'user' ||
          route.state.access === 'moderator' ||
          route.state.access === 'manager' ||
          route.state.access === 'admin')

      return (
        catCond &&
        (visitorCond || userCond || moderatorCond || managerCond || adminCond)
      )
    })

    const chapters = routesList().filter(
      (route) => route.state.type === 'chapter'
    )

    const categoriesChaptered = categories.map((category) => {
      const newCategory = { ...category }
      const categoryRoutes = []
      chapters.map((chapter) => {
        if (chapter.path.includes(category.path)) {
          categoryRoutes.push(chapter)
        }
        return null
      })
      newCategory.routes = categoryRoutes
      return newCategory
    })

    const newrubrics = rubrics.map((rubric) => {
      const newRubric = { ...rubric }
      const rubricRoutes = []
      categoriesChaptered.map((category) => {
        if (category.path.includes(rubric.path)) {
          rubricRoutes.push(category)
        }
        return null
      })
      newRubric.routes = rubricRoutes
      return newRubric
    })
    return newrubrics
  }, [routesList(), rights])

  const rubricItem = useCallback(
    pathname === '/'
      ? null
      : rubricsListe().find(
          (rubric) =>
            pathname.includes(rubric.path) && rubric.state.type === 'rubric'
        ),
    [pathname]
  )

  const category = useCallback(() => {
    const currentCategory = routesList().find(
      (route) =>
        pathname.includes(route.path) && route.state.type === 'category'
    )

    const categoryChapters = routesList().filter(
      (route) =>
        route.path.includes(currentCategory?.path) &&
        route.state.type === 'chapter'
    )
    const rubricCategory = rubricsListe().find((rubric) =>
      currentCategory?.path.includes(rubric.path)
    )
    return pathname !== '/'
      ? {
          current: currentCategory,
          rubric: rubricCategory,
          chapters: categoryChapters,
        }
      : {
          current: null,
          rubric: null,
          chapters: null,
        }
  }, [pathname, routesList(), rubricsListe()])

  const rubricColors = useCallback(() => {
    const colors = Object.entries(theme.palette)
    if (!rubricItem) return null
    if (rubricItem.state.alias === 'private' && !rights.userLevel)
      return colors.find(([key, value]) => key === 'visitor')[1]
    return colors.find(([key, value]) => key === rubricItem.state.alias)[1]
  }, [theme, rubricItem, rights])

  const current = useCallback(
    routesList().find((route) => route.path === pathname),

    [pathname]
  )

  return {
    rubric: rubricItem,
    rubricCategories: [],
    rubricColors: rubricColors(),
    categories: [],
    category: category(),
    current: current,
    chapters: [],
    categoryAlias: null,
    rubricsList: rubricsListe(),
    routesList: routesList(),
  }
}
