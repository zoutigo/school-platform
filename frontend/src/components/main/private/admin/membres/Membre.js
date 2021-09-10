import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { Collapse, Grid } from '@material-ui/core'
import CustomButton from '../../../../elements/CustomButton'
import MembreForm from './MembreForm'

function Membre({ membre }) {
  console.log('membre:', membre)
  const [showMembreForm, setShowMembreForm] = useState(false)
  const gradetext = `utilisateur`

  const grades = {
    moderateur: membre ? membre.isModerator : null,
    manager: membre ? membre.isManager : null,
    admin: membre ? membre.isAdmin : null,
  }

  const grade = useCallback(
    Object.entries(grades).find(([entry, value]) => value),
    [grades]
  )

  const handleClick = useCallback(() => {
    setShowMembreForm(!showMembreForm)
  }, [])

  return (
    <Grid item container>
      <Grid item md={6} xs={12}>
        <Grid item container>
          <Grid item xs={6} className="label">
            Email
          </Grid>
          <Grid item xs={6} className="value">
            {membre.email}
          </Grid>
        </Grid>
        <Grid item container>
          <Grid item xs={6} className="label">
            Civilité
          </Grid>
          <Grid item xs={6} className="value">
            {membre.gender}
          </Grid>
        </Grid>
        <Grid item container>
          <Grid item xs={6} className="label">
            Prénom
          </Grid>
          <Grid item xs={6} className="value">
            {membre.firstname}
          </Grid>
        </Grid>
        <Grid item container>
          <Grid item xs={6} className="label">
            Nom
          </Grid>
          <Grid item xs={6} className="value">
            {membre.lastname}
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={6} xs={12}>
        <Grid item container>
          <Grid item xs={6} className="label">
            Email verifié
          </Grid>
          <Grid item xs={6} className="value">
            {membre.isVerified ? 'oui' : 'non'}
          </Grid>
        </Grid>
        <Grid item container>
          <Grid item xs={6} className="label">
            Classe Enfants
          </Grid>
          <Grid item xs={6} className="value">
            {membre.entities
              ? membre.entities.map((entity) => (
                  <div key={entity.id}>{entity.name}</div>
                ))
              : 'Non indiqué'}
          </Grid>
        </Grid>
        <Grid item container>
          <Grid item xs={6} className="label">
            Grade
          </Grid>
          <Grid item xs={6} className="value">
            {grade ? grade[0] : gradetext}
          </Grid>
        </Grid>
        <Grid item container>
          <Grid item xs={6} className="label">
            Roles
          </Grid>
          <Grid item xs={6} className="value">
            {membre.roles && membre.roles.length > 0
              ? membre.roles.map((role) => (
                  <div key={role.id}>{role.alias}</div>
                ))
              : 'Aucun role'}
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <CustomButton
          action="update"
          text="Mofifier le role ou le grade"
          type="button"
          width="100%"
          onClick={handleClick}
        />
      </Grid>
      <Collapse in={showMembreForm}>
        <MembreForm setShowMembreForm={setShowMembreForm} user={membre} />
      </Collapse>
    </Grid>
  )
}

Membre.propTypes = {
  membre: PropTypes.shape({
    email: PropTypes.string,
    gender: PropTypes.string,
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    isVerified: PropTypes.bool,
    isManager: PropTypes.bool,
    isModerator: PropTypes.bool,
    isAdmin: PropTypes.bool,
    entities: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
      })
    ),
    roles: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
      })
    ),
  }).isRequired,
}

export default Membre
