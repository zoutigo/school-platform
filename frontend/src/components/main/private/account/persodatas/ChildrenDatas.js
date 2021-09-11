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

function ChildrenDatas({ childrenClasses, toggle, setToggle, setForm }) {
  const text = `Je n'ai pas d'enfant dans cette école`
  const Classrooms = ({ classrooms }) => {
    if (!classrooms || classrooms.length < 1)
      return <StyledPersoDataValueTypo>{text}</StyledPersoDataValueTypo>
    return classrooms.map((classroom) => (
      <div key={classroom.id}>
        <StyledPersoDataValueTypo>{classroom.name}</StyledPersoDataValueTypo>
      </div>
    ))
  }

  Classrooms.propTypes = {
    classrooms: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
      })
    ).isRequired,
  }

  const handleClick = () => {
    setToggle('form')
    setForm({
      credentialsform: false,
      childrenform: true,
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
    <StyledPersoDataContainer>
      <StyledPersoDataFieldGrid container>
        <Grid item sm={6}>
          <StyledPersoDataEntryTypo>
            {' '}
            Classes de vos enfants :
          </StyledPersoDataEntryTypo>
        </Grid>
        <Grid item sm={6}>
          <Classrooms classrooms={childrenClasses} />
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
ChildrenDatas.defaultProps = {
  childrenClasses: null,
}

ChildrenDatas.propTypes = {
  childrenClasses: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
    })
  ),
  toggle: PropTypes.string.isRequired,
  setForm: PropTypes.func.isRequired,
  setToggle: PropTypes.func.isRequired,
}
export default ChildrenDatas
