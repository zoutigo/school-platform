import React from 'react'
import ResumeCard from '../components/elements/ResumeCard'
import { StyledCardPageGrid } from '../components/elements/styled'
// eslint-disable-next-line import/named
import { useRouteDatas } from '../utils/hooks'

function VieScolaireScreen() {
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

export default VieScolaireScreen
