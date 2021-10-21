/* eslint-disable import/named */
import React, { useCallback } from 'react'

import useRigths from '../hooks/useRigths'
import useRoutesInfos from '../hooks/useRoutesInfos'
import NavFieldset from './NavFieldset'
import { StyledNavigatorGrid } from './styled'

function NavigatorCategory() {
  const { category, rubricsList, current } = useRoutesInfos()
  const { userLevel } = useRigths()
  const { chapters, rubric: categoryRubric } = category
  const { routes } = categoryRubric

  const rubricCategories = useCallback(
    routes.map(({ path, state }) => ({ path, state })),
    [routes]
  )

  const sortedChapters = useCallback(
    chapters.map(({ state, path }) => ({ state, path })),
    [chapters]
  )

  const rubrics = useCallback(
    rubricsList.map(({ path, state }) => ({ path, state })),
    [rubricsList]
  )

  const filteredRubrics = useCallback(() => {
    const userExclusions = ['login', 'register']
    const visitorExclusions = ['private']
    const filtered = userLevel
      ? rubrics.filter((rubric) => !userExclusions.includes(rubric.state.alias))
      : rubrics.filter(
          (rubric) => !visitorExclusions.includes(rubric.state.alias)
        )

    return filtered
  }, [rubrics])
  return (
    <StyledNavigatorGrid>
      <NavFieldset
        legend="Dans cette catégorie"
        routes={sortedChapters}
        current={current}
      />
      <NavFieldset
        legend="Dans la meme rubrique"
        routes={rubricCategories}
        current={current}
      />
      <NavFieldset
        legend="Toutes les rubriques"
        routes={filteredRubrics()}
        current={current}
      />
    </StyledNavigatorGrid>
  )
}

export default React.memo(NavigatorCategory)
