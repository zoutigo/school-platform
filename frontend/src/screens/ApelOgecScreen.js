/* eslint-disable import/named */
import React from 'react'
import ResumeCard from '../components/elements/ResumeCard'
import { StyledCardPageGrid } from '../components/elements/styled'
import { useRoutesInfos } from '../utils/hooks'

function ApelOgecScreen() {
  const { rubric } = useRoutesInfos()
  console.log('rubricinfos:', rubric)
  return (
    <StyledCardPageGrid container>
      {rubric.routes &&
        rubric.routes.map((data) => (
          <ResumeCard element={data} key={data.path} />
        ))}
    </StyledCardPageGrid>
  )
}

export default ApelOgecScreen
