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

function CredentialDatas({ credentialdatas, toggle, setToggle, setForm }) {
  const fields = Object.entries(credentialdatas)

  const handleClick = () => {
    setToggle('form')
    setForm({
      credentialsform: true,
      childrenform: false,
      rolesform: false,
      passwordform: false,
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
    <StyledPersoDataContainer item container>
      {fields.map(([entry, value]) => (
        <StyledPersoDataFieldGrid item container key={entry}>
          <Grid item sm={6}>
            <StyledPersoDataEntryTypo>{entry}:</StyledPersoDataEntryTypo>
          </Grid>
          <Grid item>
            <StyledPersoDataValueTypo field={entry}>
              {value}
            </StyledPersoDataValueTypo>
          </Grid>
        </StyledPersoDataFieldGrid>
      ))}
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

CredentialDatas.propTypes = {
  credentialdatas: PropTypes.shape({
    gender: PropTypes.string.isRequired,
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string,
  }).isRequired,
  toggle: PropTypes.string.isRequired,
  setForm: PropTypes.func.isRequired,
  setToggle: PropTypes.func.isRequired,
}

export default CredentialDatas
