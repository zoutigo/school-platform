import React from 'react'
import PropTypes from 'prop-types'
import { Grid } from '@material-ui/core'
import {
  StyledPersoDataContainer,
  StyledPersoDataEntryTypo,
  StyledPersoDataFieldGrid,
  StyledPersoDataValueTypo,
} from './Style'

function GradeDatas({ grades }) {
  const text = `utilisateur`
  const grade = Object.entries(grades).find(([entry, value]) => value)

  return (
    <StyledPersoDataContainer>
      <StyledPersoDataFieldGrid container>
        <Grid item sm={6}>
          <StyledPersoDataEntryTypo> Mon grade :</StyledPersoDataEntryTypo>
        </Grid>
        <Grid item sm={6}>
          <StyledPersoDataValueTypo>
            {grade ? grade[0] : text}
          </StyledPersoDataValueTypo>
        </Grid>
      </StyledPersoDataFieldGrid>
    </StyledPersoDataContainer>
  )
}

GradeDatas.propTypes = {
  grades: PropTypes.exact({
    moderateur: PropTypes.bool,
    manager: PropTypes.bool,
    admin: PropTypes.bool,
  }).isRequired,
}
export default GradeDatas
