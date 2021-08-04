import React from 'react'
import ResumeCard from '../components/elements/ResumeCard'
import { StyledCardPageGrid } from '../components/elements/styled'
// eslint-disable-next-line import/named
import { useRoutesInfos } from '../utils/hooks'

function VieScolaireScreen() {
  const { rubric } = useRoutesInfos()
  return (
    <StyledCardPageGrid container>
      {rubric.routes &&
        rubric.routes.map((data) => (
          <ResumeCard element={data} key={data.path} />
        ))}
    </StyledCardPageGrid>
  )
}

export default VieScolaireScreen
