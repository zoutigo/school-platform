import { Button, ButtonGroup, Grid, styled } from '@material-ui/core'
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useQuery } from 'react-query'
import { apiFecthClassroom } from '../utils/api'
import Classrooms from '../constants/classrooms'
import { setCategoryAside } from '../redux/settings/SettingsActions'
import { useCurrentCategory } from '../utils/hooks'
import ClassroomSummary from '../components/main/classes/ClassroomSummary'
import { StyledAlert } from '../components/elements/styled'
import ClassroomSummaryForm from '../components/main/classes/ClassroomSummaryForm'
import ApiAlert from '../components/elements/ApiAlert'
import ClassroomImageForm from '../components/main/classes/ClassroomImageForm'

const StyledButtonGroup = styled(ButtonGroup)(() => ({
  height: '3rem',
  marginTop: '1em',
}))
const StyledButton = styled(Button)(({ theme }) => ({
  height: '3em',
  background: theme.palette.primary.main,
  padding: '0.5em 1em',
}))
function ClassesPresentationScreen() {
  const dispatch = useDispatch()
  const { path: categoryPath } = useCurrentCategory()
  const { pathname } = useLocation()
  const { Routes } = useSelector((state) => state.settings)
  const { alias } = Routes.find((route) => route.path === pathname)
  const [showImageForm, setShowImageForm] = useState(false)
  const [showSummaryForm, setShowSummaryForm] = useState(false)
  const [showButtonGroup, setShowButtonGroup] = useState(true)
  const [showSummary, setShowSummary] = useState(true)
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')

  const queryName = `classroom-${alias}`

  const { isLoading, isError, data, error } = useQuery([queryName, alias], () =>
    apiFecthClassroom(alias)
  )
  if (isLoading) {
    return <ApiAlert severity="warning">Chargement ...</ApiAlert>
  }

  if (isError) {
    return <ApiAlert severity="error">{error.message}</ApiAlert>
  }

  const {
    _id: classroomId,
    summary,
    image,
    email,
    alias: classroomAlias,
  } = data

  // aside creation
  const { enseignants: classroomTeachers } = Classrooms.find(
    (classroom) => classroom.name === classroomAlias
  )

  const asideItems = classroomTeachers.map((enseignant) => {
    const { genre, lastname, firstname } = enseignant
    return {
      subtitle: 'enseignant',
      user: {
        gender: genre,
        firstname,
        lastname,
      },
    }
  })

  const contacts = {
    subtitle: 'contacts',
    text: email,
  }
  asideItems.push(contacts)
  const asideClassroom = {
    title: 'Infos Classe',
    items: asideItems,
  }

  dispatch(setCategoryAside([categoryPath, asideClassroom]))

  return (
    <Grid container direction="column">
      {showAlert && (
        <StyledAlert severity="success">{alertMessage}</StyledAlert>
      )}
      {showSummary && (
        <ClassroomSummary
          text={summary}
          image={image}
          alias={classroomAlias}
          id={classroomId}
        />
      )}
      {showImageForm && (
        <Grid item container justify="center">
          <ClassroomImageForm
            setShowImageForm={setShowImageForm}
            setShowButtonGroup={setShowButtonGroup}
            setShowAlert={setShowAlert}
            setAlertMessage={setAlertMessage}
            setShowSummary={setShowSummary}
            id={classroomId}
            alias={classroomAlias}
          />
        </Grid>
      )}
      {showSummaryForm && (
        <Grid item container justify="center">
          <ClassroomSummaryForm
            classroomId={classroomId}
            classroomAlias={alias}
            setShowButtonGroup={setShowButtonGroup}
            setShowSummaryForm={setShowSummaryForm}
            setShowSummary={setShowSummary}
            setShowAlert={setShowAlert}
            setAlertMessage={setAlertMessage}
            classroomSummary={summary}
          />
        </Grid>
      )}
      <Grid item container>
        {showButtonGroup && (
          <StyledButtonGroup>
            <StyledButton
              onClick={() => {
                setShowSummaryForm(true)
                setShowButtonGroup(false)
                setShowSummary(false)
              }}
            >
              Modifier le texte
            </StyledButton>
            <StyledButton
              onClick={() => {
                setShowImageForm(true)
                setShowButtonGroup(false)
                setShowSummary(false)
              }}
            >
              Modifier image
            </StyledButton>
          </StyledButtonGroup>
        )}
      </Grid>
    </Grid>
  )
}

export default ClassesPresentationScreen
