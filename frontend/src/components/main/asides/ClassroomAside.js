import React, { useCallback } from 'react'
import { useQuery } from 'react-query'
import { useLocation } from 'react-router-dom'
import APELTEAM from '../../../constants/apelteam'
import Classrooms from '../../../constants/classrooms'
import OGECTEAM from '../../../constants/ogecteam'
import { apiFecthEntity } from '../../../utils/api'

import Aside from './Aside'

function ClassroomAside() {
  const { pathname } = useLocation()
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
  const queryName = `classroom-${alias}`
  const queryParams = `alias=${alias}`
  const queryKey = [queryName]
  const { data } = useQuery(queryKey, () => apiFecthEntity(queryParams))
  if (!data || !Array.isArray(data)) return null
  const [result] = data

  const Classroom = Classrooms.find(
    (classroom) => result && classroom.name === result?.alias
  )

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

  return <Aside datas={asideClassroom} />
}

export default ClassroomAside
