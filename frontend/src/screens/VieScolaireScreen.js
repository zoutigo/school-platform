import React from 'react'
import ResumeCard from '../components/elements/ResumeCard'
import { StyledCardPageGrid } from '../components/elements/styled'
import useRoutesInfos from '../components/hooks/useRoutesInfos'
// eslint-disable-next-line import/named

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
