import React from 'react'
import ResumeCard from '../components/elements/ResumeCard'
import { StyledCardPageGrid } from '../components/elements/styled'
import { useRouteDatas } from '../utils/hooks'

function ClassesScreen() {
  const { categories } = useRouteDatas()
  return (
    <StyledCardPageGrid container>
      {categories &&
        categories.map((data) => <ResumeCard element={data} key={data.path} />)}
    </StyledCardPageGrid>
  )
}

export default ClassesScreen
