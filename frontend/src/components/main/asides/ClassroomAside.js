import React, { useCallback, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useLocation } from 'react-router-dom'

import { apiFecthEntity } from '../../../utils/api'
import { useIsTokenValid } from '../../../utils/hooks'

import Aside from './Aside'

function ClassroomAside() {
  const { pathname } = useLocation()
  const [entity, setEntity] = useState(null)
  const tokenIsValid = useIsTokenValid()
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

  useEffect(() => {
    if (data && Array.isArray(data)) {
      const [result] = data
      setEntity(result)
    }
  }, [data])

  // if (!data || !Array.isArray(data)) return null
  // const [result] = data

  // lister les roles

  const entityRoles = useCallback(
    entity && entity.roles ? entity.roles : null,
    [entity]
  )

  const generateItems = () => {
    const items = []
    if (entity && entity.roles) {
      entityRoles.forEach(({ name, users }) => {
        if (users && users.length > 0) {
          users.forEach((user) => {
            items.push({
              subtitle: name,
              user: {
                gender: user.gender,
                lastname: user.lastname,
                firstname: user.firstname,
              },
            })
          })
        }
      })
    }

    return items
  }

  const asideItems = generateItems()

  const contacts = {
    subtitle: 'contacts',
    text: entity && entity.email ? entity.email : null,
  }

  if (tokenIsValid) {
    asideItems.push(contacts)
  }

  const asideClassroom = {
    title: 'Infos Classe',
    items: asideItems,
  }

  if (asideItems.length < 1) return null

  return <Aside datas={asideClassroom} />
}

export default ClassroomAside
