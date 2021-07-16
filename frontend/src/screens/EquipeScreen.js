import { Grid, styled, Typography } from '@material-ui/core'
import React from 'react'

import Classrooms from '../constants/classrooms'
import Equipe from '../constants/equipe'
import Title from '../components/elements/Title'
import PersonaEquipeCard from '../components/main/ecole/equipe/PersonaEquipeCard'

const ClassroomNameGrid = styled(Grid)(() => ({
  textTransform: 'uppercase',
}))
const StyledBlocGrid = styled(Grid)(() => ({
  padding: '1rem 2rem ',
  '& :nth-child(2)': {
    background: 'whitesmoke',
    paddingLeft: '0.2rem',
    borderRadius: '5px',
  },
}))

const StyledClaroomNameTypo = styled(Typography)(() => ({
  fontSize: '1.3rem',
  letterSpacing: '1px',
  lineHeight: 1.1,
  textTransform: 'uppercase',
}))

function EquipeScreen() {
  const personnelsOgec = Equipe.filter(
    ({ entites, roles }) => entites.includes('ogec') && roles.length > 0
  )

  return (
    <Grid container>
      <StyledBlocGrid item container xs={12} md={6}>
        <Grid container>
          <Title title="Les enseignants" />
        </Grid>
        <Grid container alignItems="flex-start">
          {Classrooms.map((classroom) => (
            <Grid container alignItems="center">
              <ClassroomNameGrid item xs={2}>
                <StyledClaroomNameTypo>{classroom.name}</StyledClaroomNameTypo>
              </ClassroomNameGrid>
              <Grid item xs={9} style={{ marginBottom: '0.75rem' }}>
                {classroom.enseignants.map((persona) => (
                  <PersonaEquipeCard
                    persona={persona}
                    classroomName={classroom.name}
                  />
                ))}
              </Grid>
            </Grid>
          ))}
        </Grid>
      </StyledBlocGrid>
      <StyledBlocGrid
        item
        container
        xs={12}
        md={6}
        direction="column"
        alignItems="flex-start"
      >
        <Grid container>
          <Title title="Le personnel OGEC" />
        </Grid>
        <Grid container>
          {personnelsOgec.map((persona) => (
            <PersonaEquipeCard persona={persona} />
          ))}
        </Grid>
      </StyledBlocGrid>
    </Grid>
  )
}

export default EquipeScreen
