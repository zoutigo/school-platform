import { Button, ButtonGroup, Grid, styled, useTheme } from '@material-ui/core'
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useQuery } from 'react-query'
import { apiFecthEntity } from '../utils/api'
import Classrooms from '../constants/classrooms'
import { setCategoryAside } from '../redux/settings/SettingsActions'
import { useCurrentCategory, useRigths } from '../utils/hooks'
import ClassroomSummary from '../components/main/classes/ClassroomSummary'
import { StyledAlert } from '../components/elements/styled'
import ClassroomSummaryForm from '../components/main/classes/ClassroomSummaryForm'
import ApiAlert from '../components/elements/ApiAlert'
import ClassroomImageForm from '../components/main/classes/ClassroomImageForm'
import useRoles from '../utils/roles'
import ToolTipEditPage from '../components/elements/ToolTipEditPage'
import ClassroomForm from '../components/main/classes/ClassroomForm'
import AlertCollapse from '../components/elements/AlertCollapse'

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
  const theme = useTheme()
  const dispatch = useDispatch()
  const { path: categoryPath } = useCurrentCategory()
  const { pathname } = useLocation()
  const [showImageForm, setShowImageForm] = useState(false)
  const [showSummaryForm, setShowSummaryForm] = useState(false)
  const [showButtonGroup, setShowButtonGroup] = useState(true)
  const [showClassroomForm, setShowClassroomForm] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [showEditToolTip, setShowEditToolTip] = useState(true)
  const [alert, setAlert] = useState({
    openAlert: false,
    severity: 'error',
    alertText: '',
  })
  const prealias = pathname.split('/')[2]

  const defineAlias = (extract) => {
    switch (extract) {
      case 'petite-section':
        return 'ps'
      case 'moyenne-section':
        return 'ms'
      case 'grande-section':
        return 'gs'

      default:
        return extract
    }
  }
  const alias = defineAlias(prealias)

  const { moderatorLevel } = useRigths()
  const {
    psEnseignant,
    msEnseignant,
    gsEnseignant,
    cpEnseignant,
    ce1Enseignant,
    ce2Enseignant,
    cm1Enseignant,
    cm2Enseignant,
  } = useRoles()

  const defineRole = (aliasName) => {
    switch (aliasName) {
      case 'ps':
        return psEnseignant
      case 'ms':
        return msEnseignant
      case 'gs':
        return gsEnseignant
      case 'cp':
        return cpEnseignant
      case 'ce1':
        return ce1Enseignant
      case 'ce2':
        return ce2Enseignant
      case 'cm1':
        return cm1Enseignant
      case 'cm2':
        return cm2Enseignant

      default:
        return false
    }
  }

  const isAllowedToChange = moderatorLevel || defineRole(alias)

  const queryName = `classroom-${alias}`
  const queryParams = `alias=${alias}`
  const queryKey = [queryName]
  const { isLoading, isError, data, error } = useQuery(queryKey, () =>
    apiFecthEntity(queryParams)
  )

  if (isLoading) return <ApiAlert severity="warning">Chargement ...</ApiAlert>
  if (isError)
    return (
      <AlertCollapse
        severity="error"
        alertText={error.message}
        openAlert={isError}
      />
    )
  if (!Array.isArray(data)) return null

  const [result] = data

  // aside creation
  const { enseignants: classroomTeachers } = Classrooms.find(
    (classroom) => result && classroom.name === result?.alias
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
    text: result?.email,
  }
  asideItems.push(contacts)
  const asideClassroom = {
    title: 'Infos Classe',
    items: asideItems,
  }

  dispatch(setCategoryAside([categoryPath, asideClassroom]))

  return (
    <Grid container>
      <AlertCollapse
        severity={alert.severity}
        alertText={alert.alertText}
        openAlert={alert.openAlert}
      />

      {showClassroomForm && isAllowedToChange && (
        <ClassroomForm
          setShowClassroomForm={setShowClassroomForm}
          queryKey={queryKey}
          setAlert={setAlert}
          classroomData={result}
        />
      )}

      {!showClassroomForm && (
        <ClassroomSummary
          text={result?.summary}
          image={result?.image}
          alias={result?.alias}
          id={result._id || null}
        />
      )}
      {isAllowedToChange && (
        <ToolTipEditPage
          show={!showClassroomForm}
          callback={setShowClassroomForm}
        />
      )}
      {/* {showImageForm && (
        <Grid item container justify="center">
          <ClassroomImageForm
            setShowImageForm={setShowImageForm}
            setShowButtonGroup={setShowButtonGroup}
            setShowAlert={setShowAlert}
            setAlertMessage={setAlertMessage}
            setShowClassroomForm={setShowClassroomForm}
            queryKey={queryKey}
            id={result?._id}
          />
        </Grid>
      )} */}
      {/* {showSummaryForm && isAllowedToChange && (
        <Grid item container justify="center">
          <ClassroomSummaryForm
            classroomId={result?._id}
            setShowButtonGroup={setShowButtonGroup}
            setShowSummaryForm={setShowSummaryForm}
            setShowClassroomForm={setShowClassroomForm}
            setShowAlert={setShowAlert}
            setAlertMessage={setAlertMessage}
            classroomSummary={result?.summary}
            queryKey={queryKey}
          />
        </Grid>
      )} */}
      {/* <Grid item container>
        {showButtonGroup && isAllowedToChange && (
          <StyledButtonGroup>
            <StyledButton
              onClick={() => {
                setShowSummaryForm(true)
                setShowButtonGroup(false)
                setShowClassroomForm(false)
              }}
            >
              Modifier le texte
            </StyledButton>
            <StyledButton
              onClick={() => {
                setShowImageForm(true)
                setShowButtonGroup(false)
                setShowClassroomForm(false)
              }}
            >
              Modifier image
            </StyledButton>
          </StyledButtonGroup>
        )}
      </Grid> */}
    </Grid>
  )
}

export default ClassesPresentationScreen
