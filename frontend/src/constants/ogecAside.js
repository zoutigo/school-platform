import React from 'react'
import AsideSubTitle from '../components/main/structure/AsideSubTitle'
import AsideUser from '../components/main/structure/AsideUser'
import OGECTEAM from './ogecteam'

const asideOgec = {
  title: "Bureau de l'OGEC",
  items: OGECTEAM.map((member) => {
    const { role, gender, firstname, lastname } = member
    return {
      subtitle: <AsideSubTitle subtitle={role} />,
      text: (
        <AsideUser gender={gender} firstname={firstname} lastname={lastname} />
      ),
    }
  }),
}

export default asideOgec
