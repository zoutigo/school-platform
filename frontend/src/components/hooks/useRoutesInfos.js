import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import routes from '../../constants/routes'
import theme from '../../constants/theme'
import useRigths from './useRigths'

const useRoutesInfos = () => {
  const { Chemins: chemins } = useSelector((state) => state.settings)
  const { pathname } = useLocation()
  const rights = useRigths()
  const level = () => {
    if (rights.adminLevel) return 'admin'
    if (rights.managerLevel) return 'manager'
    if (rights.moderatorLevel) return 'moderator'
    if (rights.userLevel) return 'user'
    return 'visitor'
  }

  const userExclusions = useCallback(['identification'], [])

  const userCond = useCallback(
    (route) =>
      (route.state.access === 'public' || route.state.access === 'user') &&
      !userExclusions.includes(route.state.alias),
    []
  )
  const visitorCond = useCallback(
    (route) => route.state.access === 'public',
    []
  )

  const moderatorCond = useCallback(
    (route) =>
      (route.state.access === 'public' ||
        route.state.access === 'user' ||
        route.state.access === 'moderator') &&
      !userExclusions.includes(route.state.alias),
    []
  )

  const managerCond = useCallback(
    (route) =>
      (route.state.access === 'public' ||
        route.state.access === 'user' ||
        route.state.access === 'moderator' ||
        route.state.access === 'manager') &&
      !userExclusions.includes(route.state.alias),
    []
  )

  const adminCond = useCallback(
    (route) =>
      (route.state.access === 'public' ||
        route.state.access === 'user' ||
        route.state.access === 'moderator' ||
        route.state.access === 'manager' ||
        route.state.access === 'admin') &&
      !userExclusions.includes(route.state.alias),
    []
  )

  const filterRoute = useCallback(
    (route) => {
      switch (level()) {
        case 'admin':
          return adminCond(route)
        case 'manager':
          return managerCond(route)
        case 'moderator':
          return moderatorCond(route)
        case 'user':
          return userCond(route)

        default:
          return visitorCond(route)
      }
    },
    [level()]
  )

  // routes list

  const routesList = useCallback(() => {
    const list = []
    routes.map((rubricroute) => {
      const rubricmatch =
        chemins && Array.isArray(chemins)
          ? chemins.find((chemin) => rubricroute.path === chemin.path)
          : null

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
          const categorymatch =
            chemins && Array.isArray(chemins)
              ? chemins.find((chemin) => categoryroute.path === chemin.path)
              : null
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
              const chaptermatch =
                chemins && Array.isArray(chemins)
                  ? chemins.find((chemin) => chapterroute.path === chemin.path)
                  : null
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
    const rubrics = routesList().filter(
      (route) => route.state.type === 'rubric'
    )
    const categories = routesList().filter((route) => {
      const catCond = route.state.type === 'category'

      return catCond && filterRoute(route)
    })

    const chapters = routesList().filter(
      (route) => route.state.type === 'chapter' && filterRoute(route)
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

export default useRoutesInfos
