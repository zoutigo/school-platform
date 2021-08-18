import React, { useCallback } from 'react'
import OGECTEAM from '../../../constants/ogecteam'
import Aside from './Aside'

function OgecAside() {
  const datas = useCallback(
    {
      title: 'Bureau Ogec',
      items: OGECTEAM.map((teamer) => {
        const { role, gender, firstname, lastname } = teamer
        return {
          subtitle: role,
          user: { gender, firstname, lastname },
        }
      }),
    },
    [OGECTEAM]
  )

  return <Aside datas={datas} />
}

export default OgecAside
