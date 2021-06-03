import React from 'react'
import AsideSubTitle from '../components/main/structure/AsideSubTitle'
import AsideUser from '../components/main/structure/AsideUser'
import APELTEAM from './apelteam'

const asideApel = {
  title: "Bureau de l'APEL",
  items: APELTEAM.map((member) => {
    const { role, gender, firstname, lastname } = member
    return {
      subtitle: <AsideSubTitle subtitle={role} />,
      text: (
        <AsideUser gender={gender} firstname={firstname} lastname={lastname} />
      ),
    }
  }),
}

export default asideApel
