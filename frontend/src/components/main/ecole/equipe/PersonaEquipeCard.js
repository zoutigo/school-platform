import React from 'react'
import PropTypes from 'prop-types'
import faker from 'faker'
import { Grid, Icon, styled, Typography, useTheme } from '@material-ui/core'

const StyledUserCardGrid = styled(Grid)(() => ({
  marginTop: '1.9rem',
  '& div': {
    marginRight: '0.5rem',
  },
}))

const StyledIcon = styled(Icon)(({ bgcolor }) => ({
  fontSize: '0.7rem',
  marginBottom: '0.5rem',
  color: bgcolor,
}))

const StyledNameTypo = styled(Typography)(() => ({
  fontSize: '1rem',
  letterSpacing: '1px',
  lineHeight: 1.1,
  textTransform: 'uppercase',
}))

const StyledFirstNameTypo = styled(StyledNameTypo)(() => ({
  textTransform: 'capitalize',
}))

function PersonaEquipeCard({ persona, classroomName }) {
  const { genre, lastname, firstname, roles } = persona
  const theme = useTheme()
  return (
    <StyledUserCardGrid container>
      <Grid item>
        <StyledIcon
          bgcolor={
            genre === 'monsieur'
              ? theme.palette.secondary.main
              : theme.palette.primary.main
          }
          className={genre === 'madame' ? 'fa fa-venus' : 'fa fa-mars'}
          aria-hidden="true"
        />
      </Grid>
      <Grid item>
        <StyledFirstNameTypo variant="body1">
          {firstname || faker.name.firstName()}
        </StyledFirstNameTypo>
      </Grid>
      <Grid item>
        <StyledNameTypo variant="body1">{lastname || 'hello'}</StyledNameTypo>
      </Grid>
      {!classroomName && roles && (
        <Grid item>
          {roles.map((role) => (
            <Typography variant="caption">{role} </Typography>
          ))}
        </Grid>
      )}
    </StyledUserCardGrid>
  )
}
PersonaEquipeCard.defaultProps = {
  classroomName: null,
}

PersonaEquipeCard.propTypes = {
  persona: PropTypes.exact({
    genre: PropTypes.string,
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    entites: PropTypes.arrayOf(PropTypes.string),
    roles: PropTypes.arrayOf(PropTypes.string),
    mission: PropTypes.string,
    classes: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  classroomName: PropTypes.string,
}

export default PersonaEquipeCard
