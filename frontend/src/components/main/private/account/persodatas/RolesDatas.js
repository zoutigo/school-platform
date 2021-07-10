import React from 'react'
import PropTypes from 'prop-types'
import { Grid } from '@material-ui/core'
import {
  StyledPersoDataContainer,
  StyledPersoDataEntryTypo,
  StyledPersoDataFieldGrid,
  StyledPersoDataValueTypo,
} from './Style'

function RolesDatas({ roles }) {
  const text = `Je n'ai pas de role`
  const Roles = ({ roleslist }) => {
    if (!roleslist || roleslist.length < 1)
      return <StyledPersoDataValueTypo>{text}</StyledPersoDataValueTypo>
    return roleslist.map((role) => (
      <div key={role._id}>
        <StyledPersoDataValueTypo>{role.name}</StyledPersoDataValueTypo>
      </div>
    ))
  }

  return (
    <StyledPersoDataContainer>
      <StyledPersoDataFieldGrid container>
        <Grid item sm={6}>
          <StyledPersoDataEntryTypo> Mes roles :</StyledPersoDataEntryTypo>
        </Grid>
        <Grid item sm={6}>
          <Roles roleslist={roles} />
        </Grid>
      </StyledPersoDataFieldGrid>
    </StyledPersoDataContainer>
  )
}
RolesDatas.defaultProps = null

RolesDatas.propTypes = {
  roles: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
    })
  ),
}
export default RolesDatas
