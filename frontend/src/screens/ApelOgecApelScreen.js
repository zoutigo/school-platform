import React from 'react'
import Apel from '../components/main/apelogec/Apel'
import AsideSubTitle from '../components/wrapper/AsideSubTitle'
import AsideUser from '../components/wrapper/AsideUser'
import Wrapper from '../components/wrapper/Wrapper'
import APELTEAM from '../constants/apelteam'

function ApelOgecApelScreen() {
  const aside = {
    title: "Bureau de l'APEL",
    items: APELTEAM.map((member) => {
      const { role, gender, firstname, lastname } = member
      return {
        subtitle: String(<AsideSubTitle subtitle={role} />),
        text: String(
          <AsideUser
            gender={gender}
            firstname={firstname}
            lastname={lastname}
          />
        ),
      }
    }),
  }

  return <Wrapper main={<Apel />} aside={aside} />
}

export default ApelOgecApelScreen
