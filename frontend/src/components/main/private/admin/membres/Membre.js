/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable no-nested-ternary */
import React, { useCallback, useState } from 'react'
import ImportExportRoundedIcon from '@material-ui/icons/ImportExportRounded'
import PropTypes from 'prop-types'
import { Collapse, Grid, styled, Typography } from '@material-ui/core'
import MembreForm from './MembreForm'
import AlertMessage from '../../../../elements/AlertMessage'
import StyledBasicButton from '../../../../styled-components/StyledBasicButton'
import userPropTypes from '../../../../../constants/proytypes/userProptypes'

const StyledValueTypo = styled(Typography)(() => ({
  fontWeight: 'bold',
  '& span': {
    display: 'block',
  },
}))
const StyledValueTypoUppercase = styled(StyledValueTypo)(() => ({
  textTransform: 'uppercase',
}))
const StyledButton = styled(StyledBasicButton)(() => ({
  '& span': {
    marginLeft: '3rem',
  },
}))

function Membre({ membre: user, queryKey }) {
  if (!user)
    return (
      <Grid container>
        <AlertMessage
          severity="error"
          message="vous devez saisir une adressse mail"
        />
      </Grid>
    )

  const [showMembreForm, setShowMembreForm] = useState(false)

  const handleClick = useCallback(() => {
    setShowMembreForm(!showMembreForm)
  }, [showMembreForm])

  return (
    <Grid item container>
      {user && (
        <Grid container spacing={1} style={{ padding: '1.3rem' }}>
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
                        <span key={entity.uuid}>{entity.name}</span>
                      ))
                    : 'Non indiqué'}
                </StyledValueTypo>
              </Grid>
            </Grid>
            <Grid item container alignItems="center" spacing={2}>
              <Grid item xs={5} className="label">
                <Typography variant="h6"> Grades</Typography>
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
                        <span key={role.uuid}>{role.name}</span>
                      ))
                    : 'Aucun role'}
                </StyledValueTypo>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <StyledButton
              variant="contained"
              color={showMembreForm ? 'primary' : 'secondary'}
              startIcon={<ImportExportRoundedIcon />}
              fullWidth
              className="button"
              type="button"
              onClick={handleClick}
            >
              <span>
                {showMembreForm ? 'Refermer le panneau' : 'Modifier les roles'}
              </span>
            </StyledButton>
          </Grid>
          <Collapse in={showMembreForm} component="div">
            <MembreForm
              setShowMembreForm={setShowMembreForm}
              user={user}
              queryKey={queryKey}
            />
          </Collapse>
        </Grid>
      )}
    </Grid>
  )
}

Membre.defaultProps = {
  membre: null,
  queryKey: [],
}

Membre.propTypes = {
  membre: userPropTypes,
  queryKey: PropTypes.arrayOf(PropTypes.string),
}

export default React.memo(Membre)
