const routesInfos = (pathname, Routes) => {
  const rubricsList = []
  const routesList = []

  Routes.map((route) => {
    const { routes, ...rest } = route
    routesList.push(rest)
    if (routes && routes.length) {
      routes.map((catroute) => {
        const { routes: catRoutes, ...catrest } = catroute
        routesList.push(catrest)
        return null
      })
    }
    if (route.state.type === 'rubric') {
      const { routes: rubricRoute, ...others } = route
      rubricsList.push(others)
    }
    return null
  })

  return { rubricsList, routesList }
}

export default routesInfos
