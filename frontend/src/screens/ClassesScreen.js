/* eslint-disable import/named */
import React from 'react'
import ResumeCard from '../components/elements/ResumeCard'
import { StyledCardPageGrid } from '../components/elements/styled'
import { useRoutesInfos } from '../utils/hooks'

function ClassesScreen() {
  const { rubric } = useRoutesInfos()
  return (
    <StyledCardPageGrid container>
      {/* {rubric.routes &&
        rubric.routes.map((data) => (
          <ResumeCard element={data} key={data.path} />
        ))} */}
      <h1>Something wrong</h1>
    </StyledCardPageGrid>
  )
}

export default ClassesScreen
