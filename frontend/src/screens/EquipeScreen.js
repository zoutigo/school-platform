import { Grid, styled, Typography } from '@material-ui/core'
import React, { useCallback, useEffect } from 'react'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import Equipe from '../constants/equipe'
import Title from '../components/elements/Title'
import PersonaEquipeCard from '../components/main/ecole/equipe/PersonaEquipeCard'
import { apiFecthEntity } from '../utils/api'
import AlertCollapse from '../components/elements/AlertCollapse'
import { initialAlertCollapse } from '../constants/alerts'
import { setFetchAlert } from '../redux/alerts/AlertsActions'
import useFetchDispatch from '../components/elements/useFetchDispatch'
import randomkey from '../utils/randomkey'

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
  const personnelsOgec = useCallback(
    Equipe.filter(
      ({ entites, roles }) => entites.includes('ogec') && roles.length > 0
    ),
    [Equipe]
  )

  const queryKey = useCallback(['liste-entites'], [])
  const classroomsAliases = useCallback(
    ['cm2', 'cm1', 'ce2', 'ce1', 'cp', 'gs', 'ms', 'ps', 'adaptation'],
    []
  )
  const { fetchAlert } = useSelector((state) => state.alerts)
  const { isLoading, isError, data, error } = useQuery(queryKey, () =>
    apiFecthEntity()
  )

  // hook to dispatch alerts
  useFetchDispatch(isLoading, isError, error, data, setFetchAlert)

  useEffect(() => {
    setFetchAlert(initialAlertCollapse)
    return () => {
      setFetchAlert(initialAlertCollapse)
    }
  }, [])

  const classroomsEntities = useCallback(
    Array.isArray(data) && data.length > 0
      ? data.filter(({ alias }) => classroomsAliases.includes(alias))
      : null,
    [data]
  )

  const createPersonas = useCallback(() => {
    const personas = []
    if (classroomsEntities) {
      for (let i = 0; i < classroomsEntities.length; i += 1) {
        const { roles, alias } = classroomsEntities[i]

        if (roles && roles.length > 0) {
          for (let j = 0; j < roles.length; j += 1) {
            const { users } = roles[j]
            for (let k = 0; k < users.length; k += 1) {
              const { firstname, lastname, gender } = users[k]
              personas.push({
                classroomName: alias,
                persona: { firstname, lastname, gender },
              })
            }
          }
        }
      }
    }

    return personas
  }, [classroomsEntities])

  const persons = useCallback(
    createPersonas() && createPersonas().length > 0 ? createPersonas() : null,
    [createPersonas()]
  )

  const entityPersons = useCallback(
    (alias) =>
      !persons ? null : persons.filter((pers) => alias === pers.classroomName),
    [persons]
  )

  return (
    <Grid container>
      <Grid item container>
        <AlertCollapse {...fetchAlert} />
      </Grid>
      {Array.isArray(data) && data.length > 0 && (
        <StyledBlocGrid
          item
          container
          xs={12}
          md={6}
          justifyContent="flex-start"
        >
          <Grid container style={{ height: '10%' }}>
            <Title title="Les enseignants" />
          </Grid>
          <Grid container style={{ height: '90%' }}>
            {classroomsEntities &&
              classroomsEntities.map((classroom) => (
                <Grid container alignItems="center">
                  <ClassroomNameGrid item xs={4}>
                    <StyledClaroomNameTypo>
                      {classroom.alias}
                    </StyledClaroomNameTypo>
                  </ClassroomNameGrid>
                  <Grid item xs={8} style={{ marginBottom: '0.75rem' }}>
                    {persons &&
                      entityPersons(classroom.alias).map((person) => (
                        <PersonaEquipeCard
                          {...person}
                          key={randomkey(999999)}
                        />
                      ))}
                  </Grid>
                </Grid>
              ))}
          </Grid>
        </StyledBlocGrid>
      )}
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
