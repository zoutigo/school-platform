/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable no-nested-ternary */
import React, { useCallback, useState } from 'react'
import { useQuery } from 'react-query'
import PropTypes from 'prop-types'
import { Collapse, Grid, useTheme, styled, Typography } from '@material-ui/core'
import CustomButton from '../../../../elements/CustomButton'
import MembreForm from './MembreForm'
import { apiFecthUserDatas } from '../../../../../utils/api'

const StyledValueTypo = styled(Typography)(() => ({
  fontWeight: 'bold',
}))
const StyledValueTypoUppercase = styled(StyledValueTypo)(() => ({
  textTransform: 'uppercase',
}))

function Membre({ membre }) {
  const theme = useTheme()
  const [showMembreForm, setShowMembreForm] = useState(false)
  const gradetext = `utilisateur`
  const queryKey = [`user-${membre.id}`]

  const {
    isLoading,
    isError,
    error,
    data: user,
  } = useQuery(queryKey, () => apiFecthUserDatas(membre.id))

  const grades = useCallback(
    {
      moderateur: user ? user.isModerator : null,
      manager: user ? user.isManager : null,
      admin: user ? user.isAdmin : null,
      teacher: user ? user.isTeacher : null,
    },
    [user]
  )

  const grade = useCallback(
    Object.entries(grades).find(([entry, value]) => value),
    [grades]
  )

  const handleClick = useCallback(() => {
    setShowMembreForm(!showMembreForm)
  }, [showMembreForm])

  return (
    <Grid item container spacing={1}>
      <Grid item md={6} xs={12}>
        <Grid item container alignItems="center" spacing={2}>
          <Grid item xs={4}>
            <Typography variant="h6">Email</Typography>
          </Grid>
          <Grid item xs={8}>
            <StyledValueTypo variant="body1">
              {user ? user.email : null}
            </StyledValueTypo>
          </Grid>
        </Grid>
        <Grid item container alignItems="center" spacing={2}>
          <Grid item xs={4}>
            <Typography variant="h6">Civilité</Typography>
          </Grid>
          <Grid item xs={8}>
            <StyledValueTypo variant="body1">
              {' '}
              {user ? user.gender : null}
            </StyledValueTypo>
          </Grid>
        </Grid>
        <Grid item container alignItems="center" spacing={2}>
          <Grid item xs={4}>
            <Typography variant="h6">Prénom</Typography>
          </Grid>
          <Grid item xs={8}>
            <StyledValueTypo variant="body1">
              {user ? user.firstname : null}
            </StyledValueTypo>
          </Grid>
        </Grid>
        <Grid item container alignItems="center" spacing={2}>
          <Grid item xs={4}>
            <Typography variant="h6">Nom</Typography>
          </Grid>
          <Grid item xs={8}>
            <StyledValueTypoUppercase variant="body1">
              {user && user.lastname ? user.lastname : null}
            </StyledValueTypoUppercase>
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={6} xs={12}>
        <Grid item container alignItems="center" spacing={2}>
          <Grid item xs={5} className="label">
            <Typography variant="h6"> Email verifié</Typography>
          </Grid>
          <Grid item xs={7} className="value">
            <StyledValueTypo variant="body1">
              {user ? (user.isVerified ? 'oui' : 'non') : null}
            </StyledValueTypo>
          </Grid>
        </Grid>
        <Grid item container alignItems="center" spacing={2}>
          <Grid item xs={5} className="label">
            <Typography variant="h6"> Classe Enfants</Typography>
          </Grid>
          <Grid item xs={7} className="value">
            <StyledValueTypo variant="body1">
              {user && user.entities && user.entities.length > 0
                ? user.entities.map((entity) => (
                    <div key={entity.id}>{entity.name}</div>
                  ))
                : 'Non indiqué'}
            </StyledValueTypo>
          </Grid>
        </Grid>
        <Grid item container alignItems="center" spacing={2}>
          <Grid item xs={5} className="label">
            <Typography variant="h6"> Grade</Typography>
          </Grid>
          <Grid item xs={7} className="value">
            <StyledValueTypo variant="body1">
              {grade ? grade[0] : gradetext}
            </StyledValueTypo>
          </Grid>
        </Grid>
        <Grid item container alignItems="center" spacing={2}>
          <Grid item xs={5} className="label">
            <Typography variant="h6"> Roles</Typography>
          </Grid>
          <Grid item xs={7} className="value">
            <StyledValueTypo variant="body1">
              {user && user.roles && user.roles.length > 0
                ? user.roles.map((role) => (
                    <div key={role.id}>
                      {role.name} -- {role.entity.alias}
                    </div>
                  ))
                : 'Aucun role'}
            </StyledValueTypo>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <CustomButton
          action="toggle"
          bgcolor={theme.palette.secondary.light}
          text="Mofifier le role ou le grade"
          type="button"
          width="100%"
          onClick={handleClick}
        />
      </Grid>
      <Collapse in={showMembreForm}>
        <MembreForm
          setShowMembreForm={setShowMembreForm}
          user={user}
          queryKey={queryKey}
        />
      </Collapse>
    </Grid>
  )
}

Membre.propTypes = {
  membre: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
}

export default React.memo(Membre)
