const defineCategoryAlias = (cat = null) => {
  switch (cat) {
    case 'petite-section':
      return 'ps'
    case 'moyenne-section':
      return 'ms'
    case 'grande-section':
      return 'gs'

    default:
      return cat
  }
}

const routeDatas = (pathname, Routes) => {
  const result = {
    rubric: null,
    rubricCategories: [],
    categories: [],
    category: null,
    current: null,
    chapters: [],
    chapter: null,
    rubrics: [],
    categoryAlias: null,
  }
  if (Routes) {
    result.rubric = Routes.find(
      (route) => route.type === 'rubric' && pathname.includes(route.path)
    )

    Routes.forEach((route) => {
      // category
      if (
        route.path.includes(result.rubric.path) &&
        route.type === 'category' &&
        route.type !== 'chapter' &&
        pathname.includes(route.path)
      ) {
        console.log('rote_category', route)
        result.category = route
      }
      // chapter
      if (
        route.path.includes(result.rubric.path) &&
        route.type === 'chapter' &&
        pathname.includes(route.path)
      ) {
        result.category = route
      }
      // current
      if (route.path === pathname) {
        result.current = route
      }
      // rubrics
      if (
        route.type === 'rubric' &&
        route.alias !== 'login' &&
        route.alias !== 'register'
      ) {
        result.rubrics.push(route)
      }

      //   rubricCategories
      if (
        route.type === 'category' &&
        route.path.includes(result.rubric.path)
      ) {
        result.rubricCategories.push(route)
      }
    })
    // chapters
    Routes.forEach((route) => {
      if (
        result.category &&
        route.type === 'chapter' &&
        route.path.includes(result.category.path)
      ) {
        result.chapters.push(route)
      }
    })
  }

  result.categoryAlias = result.category
    ? defineCategoryAlias(result.category.alias)
    : null

  result.categories = result.rubricCategories

  return { ...result }
}

export default routeDatas
