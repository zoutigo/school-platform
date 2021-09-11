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

  return (
    <StyledPersoDataContainer>
      <StyledPersoDataFieldGrid container>
        <Grid item sm={6}>
          <StyledPersoDataEntryTypo> Mes roles :</StyledPersoDataEntryTypo>
        </Grid>
        <Grid item sm={6}>
          {roles && roles.length > 0 ? (
            roles.map((role) => (
              <div key={role.id}>
                <StyledPersoDataValueTypo>
                  {role.name} - {role.entity.alias}
                </StyledPersoDataValueTypo>
              </div>
            ))
          ) : (
            <StyledPersoDataValueTypo>{text}</StyledPersoDataValueTypo>
          )}
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
      entity: PropTypes.shape({
        alias: PropTypes.string,
      }),
    })
  ),
}
export default RolesDatas
