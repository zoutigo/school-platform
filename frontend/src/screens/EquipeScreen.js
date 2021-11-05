import {
  Grid,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@material-ui/core'
import { styled, withStyles } from '@material-ui/styles'
import React, { useCallback } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import { apiFecthEntity } from '../utils/api'
import useFetch from '../components/hooks/useFetch'
import AlertMessage from '../components/elements/AlertMessage'

const StyledTable = styled(Table)(({ theme }) => ({
  background: theme.palette.action.hover,
}))
const StyledTableRowHead = styled(TableRow)(() => ({
  background: 'white',
}))

const StyledLastNameTypo = styled(Typography)(() => ({
  textTransform: 'uppercase',
}))
const StyledFirstNameTypo = styled(StyledLastNameTypo)(() => ({
  // textTransform: 'capitalize',
  marginRight: '1.5rem',
}))
const StyledRoleTypo = styled(Typography)(() => ({
  textTransform: 'capitalize',
}))
const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow)

const ogecs = [
  {
    id: 0,
    lastname: 'cintas',
    firstname: 'Fréderic',
    roles: ['directeur détablissement'],
  },
  {
    id: 1,
    lastname: 'chaloin',
    firstname: 'Christine',
    roles: ['sécrétaire', 'surveillante'],
  },
  {
    id: 2,
    lastname: 'marguet',
    firstname: 'Sophie',
    roles: ['aide maternelle', 'surveillante'],
  },
  {
    id: 3,
    lastname: 'geay',
    firstname: 'Valérie',
    roles: ['aide maternelle', 'surveillante'],
  },
  {
    id: 4,
    lastname: 'landry',
    firstname: 'Véronique',
    roles: ['aide pédagogique', 'surveillante'],
  },
  {
    id: 5,
    lastname: 'rius',
    firstname: 'corinne',
    roles: ['surveillante'],
  },
  {
    id: 6,
    lastname: 'gouffrand',
    firstname: 'cheyenne',
    roles: ['agent polyvalent'],
  },
  {
    id: 7,
    lastname: 'Nachaiti',
    firstname: 'rachida',
    roles: ['agent polyvalent'],
  },
  {
    id: 7,
    lastname: 'Jacob',
    firstname: 'clara',
    roles: ['volontaire service civique'],
  },
]

function EquipeScreen() {
  const queryKey = useCallback(['liste-entites'], [])
  const classroomsAliases = useCallback(
    ['cm2', 'cm1', 'ce2', 'ce1', 'cp', 'gs', 'ms', 'ps', 'adaptation'],
    []
  )
  const queryParams = ''
  const { isLoading, isError, data, errorMessage } = useFetch(
    queryKey,
    queryParams,
    apiFecthEntity
  )

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
        const { roles, alias, name } = classroomsEntities[i]

        if (roles && roles.length > 0) {
          for (let j = 0; j < roles.length; j += 1) {
            const { users } = roles[j]
            for (let k = 0; k < users.length; k += 1) {
              const { firstname, lastname, gender } = users[k]
              personas.push({
                classroomName: name,
                classroomAlias: alias,
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

  return (
    <Grid container spacing={2}>
      {isError && <AlertMessage severity="error" message={errorMessage} />}
      {isLoading && <CircularProgress color="secondary" />}
      {Array.isArray(data) && data.length > 0 && (
        <Grid item container xs={12} md={6} justifyContent="flex-start">
          <StyledTable>
            <TableHead>
              <StyledTableRowHead>
                <TableCell variant="head" colspan="2">
                  <Typography variant="h2" color="secondary">
                    Les enseignants
                  </Typography>
                </TableCell>
              </StyledTableRowHead>
            </TableHead>
            <TableBody>
              {classroomsAliases.map((classroom) => (
                <StyledTableRow key={classroom}>
                  <TableCell>
                    <Typography variant="h2" color="secondary">
                      {classroom}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h2">
                      {persons
                        .filter((person) => classroom === person.classroomAlias)
                        .map((user) => (
                          <div key={user.firstname}>
                            <StyledFirstNameTypo component="span">
                              {user.persona.firstname}
                            </StyledFirstNameTypo>
                            <StyledLastNameTypo component="span">
                              {user.persona.lastname}
                            </StyledLastNameTypo>
                          </div>
                        ))}
                    </Typography>
                  </TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </StyledTable>
        </Grid>
      )}
      <Grid
        item
        container
        xs={12}
        md={6}
        direction="column"
        alignItems="flex-start"
      >
        <StyledTable>
          <TableHead>
            <StyledTableRowHead>
              <TableCell variant="head" colspan="3">
                <Typography variant="h2" color="secondary">
                  Le personnel OGEC
                </Typography>
              </TableCell>
            </StyledTableRowHead>
          </TableHead>
          <TableBody>
            {ogecs.map((persona) => (
              <StyledTableRow key={persona.id}>
                <TableCell>
                  <Typography variant="h2">{persona.firstname}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h2">{persona.lastname}</Typography>
                </TableCell>
                <TableCell>
                  {persona.roles.map((role) => (
                    <StyledRoleTypo variant="body2" color="secondary">
                      {role}
                    </StyledRoleTypo>
                  ))}
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </StyledTable>
      </Grid>
    </Grid>
  )
}

export default EquipeScreen
