import { Grid, styled } from '@material-ui/core'
import React from 'react'
import useRoutesInfos from '../hooks/useRoutesInfos'
import NavigatorCategory from './NavigatorCategory'
import NavigatorChapter from './NavigatorChapter'
import NavigatorRubric from './NavigatorRubric'

const StyledGrid = styled(Grid)(({ theme }) => ({
  background: theme.palette.primary.main,
  padding: '0.6rem 1rem',
  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
}))

function Navigator() {
  const { current } = useRoutesInfos()

  return (
    <StyledGrid container>
      {current?.state.type === 'rubric' && <NavigatorRubric />}
      {current?.state.type === 'category' && <NavigatorCategory />}
      {current?.state.type === 'chapter' && <NavigatorChapter />}
    </StyledGrid>
  )
}

export default Navigator
