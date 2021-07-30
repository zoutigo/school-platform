/* eslint-disable import/named */
import React from 'react'
import ResumeCard from '../components/elements/ResumeCard'
import { StyledCardPageGrid } from '../components/elements/styled'
import { useRouteDatas } from '../utils/hooks'

function EcoleScreen(props) {
  console.log(props)
  const { rubricCategories } = useRouteDatas()

  return (
    <StyledCardPageGrid container>
      {rubricCategories &&
        rubricCategories.map((data) => (
          <ResumeCard element={data} key={data.path} />
        ))}
    </StyledCardPageGrid>
  )
}

export default EcoleScreen
