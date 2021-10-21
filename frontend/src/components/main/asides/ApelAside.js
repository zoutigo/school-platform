import React, { useCallback } from 'react'
import APELTEAM from '../../../constants/apelteam'
import Aside from './Aside'

function ApelAside() {
  const datas = useCallback(
    {
      title: 'Bureau Apel',
      items: APELTEAM.map((teamer) => {
        const { role, gender, firstname, lastname } = teamer
        return {
          subtitle: role,
          user: { gender, firstname, lastname },
        }
      }),
    },
    [APELTEAM]
  )

  return <Aside datas={datas} module="apel" />
}

export default ApelAside
