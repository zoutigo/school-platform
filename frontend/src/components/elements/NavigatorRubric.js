/* eslint-disable import/named */
import React, { useCallback } from 'react'

import useRigths from '../hooks/useRigths'
import useRoutesInfos from '../hooks/useRoutesInfos'
import NavFieldset from './NavFieldset'
import { StyledNavigatorGrid } from './styled'

function NavigatorRubric() {
  const { userLevel } = useRigths()
  const { rubricsList, current, rubric: Rubric } = useRoutesInfos()
  const { routes: RubricRoutes } = Rubric

  const categories = useCallback(
    RubricRoutes.map(({ path, state }) => ({ path, state })),
    [RubricRoutes]
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
        legend="Dans cette rubrique"
        routes={categories}
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

export default React.memo(NavigatorRubric)
