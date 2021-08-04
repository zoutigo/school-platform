import { Grid } from '@material-ui/core'
import React, { useCallback, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useQuery } from 'react-query'
import { apiFecthEntity } from '../utils/api'
import Classrooms from '../constants/classrooms'
import { setCategoryAside } from '../redux/settings/SettingsActions'
import { useRigths, useRoutesInfos } from '../utils/hooks'
import ClassroomSummary from '../components/main/classes/ClassroomSummary'
import ApiAlert from '../components/elements/ApiAlert'
import useRoles from '../utils/roles'
import ClassroomForm from '../components/main/classes/ClassroomForm'
import AlertCollapse from '../components/elements/AlertCollapse'
import ToggleToolTip from '../components/elements/ToggleToolTip'

function ClassesPresentationScreen() {
  const dispatch = useDispatch()

  const { Asides } = useSelector((state) => state.settings)
  const {
    category: { current },
  } = useRoutesInfos()
  const { pathname } = useLocation()
  const [showClassroomForm, setShowClassroomForm] = useState(false)
  const [alert, setAlert] = useState({
    openAlert: false,
    severity: 'error',
    alertText: '',
  })

  const defineAlias = useCallback((extract) => {
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
  }, [])

  const alias = defineAlias(pathname.split('/')[2])

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
    adaptation,
  } = useRoles()

  const defineRole = useCallback((aliasName) => {
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
      case 'adaptation':
        return adaptation

      default:
        return false
    }
  }, [])

  const isAllowedToChange = moderatorLevel || defineRole(alias)
  const queryName = `classroom-${alias}`
  const queryParams = `alias=${alias}`
  const queryKey = [queryName]
  const { isLoading, isError, data, error } = useQuery(queryKey, () =>
    apiFecthEntity(queryParams)
  )

  const asideExist = useCallback(() => {
    const exist =
      Asides.length < 1
        ? false
        : Array.isArray(Asides.find(([path, datas]) => path === current.path))

    return exist
  }, [])

  const createAside = useCallback((result) => {
    if (!asideExist()) {
      const Classroom = Classrooms.find(
        (classroom) => result && classroom.name === result?.alias
      )
      console.log('classroom:', Classroom)

      if (!Classroom) return null

      const { enseignants: classroomTeachers } = Classroom

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

      dispatch(setCategoryAside([current.path, asideClassroom]))
    }

    return null
  }, [])

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

  createAside(result)

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
        <ToggleToolTip
          init={!showClassroomForm}
          toggleValue={showClassroomForm}
          staticText="Modifier la page"
          activeText="Retour à la presentation"
          action="update"
          callback={setShowClassroomForm}
        />
      )}
    </Grid>
  )
}

export default React.memo(ClassesPresentationScreen)
