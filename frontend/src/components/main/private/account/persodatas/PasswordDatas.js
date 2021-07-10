import React from 'react'
import PropTypes from 'prop-types'
import { Grid } from '@material-ui/core'
import {
  StyledPersoDataContainer,
  StyledPersoDataEntryTypo,
  StyledPersoDataFieldGrid,
  StyledPersoDataValueTypo,
} from './Style'
import ToolTipPrivateDatas from '../../../../elements/ToolTipPrivateDatas'

function PasswordDatas({ toggle, setToggle, setForm }) {
  const handleClick = () => {
    setToggle('form')
    setForm({
      credentialsform: false,
      childrenform: false,
      rolesform: false,
      passwordform: true,
      usnubscribeform: false,
      statusform: false,
      gradeform: false,
    })
  }

  const handleClose = () => {
    setToggle('list')
    setForm({
      credentialsform: false,
      childrenform: false,
      rolesform: false,
      passwordform: false,
      usnubscribeform: false,
      statusform: false,
      gradeform: false,
    })
  }
  return (
    <StyledPersoDataContainer>
      <StyledPersoDataFieldGrid container>
        <Grid item sm={6}>
          <StyledPersoDataEntryTypo> Mot de pass</StyledPersoDataEntryTypo>
        </Grid>
        <Grid item sm={6}>
          <StyledPersoDataValueTypo>XXXXXXXXXXXXXXXX</StyledPersoDataValueTypo>
        </Grid>
      </StyledPersoDataFieldGrid>
      <Grid item container justify="flex-end">
        {toggle === 'list' ? (
          <ToolTipPrivateDatas
            callback={handleClick}
            title="modifier mes informations"
            initialPosition
            action="edit"
          />
        ) : (
          <ToolTipPrivateDatas
            callback={handleClose}
            title="modifier mes informations"
            initialPosition
            action="cancel"
          />
        )}
      </Grid>
    </StyledPersoDataContainer>
  )
}

PasswordDatas.propTypes = {
  grades: PropTypes.exact({
    moderateur: PropTypes.bool,
    manager: PropTypes.bool,
    admin: PropTypes.bool,
  }).isRequired,
  toggle: PropTypes.string.isRequired,
  setForm: PropTypes.func.isRequired,
  setToggle: PropTypes.func.isRequired,
}
export default PasswordDatas
