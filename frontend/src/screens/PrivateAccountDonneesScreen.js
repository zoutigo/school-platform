import { Grid, styled } from '@material-ui/core'
import React, { useState } from 'react'
import PersoDataForm from '../components/main/private/account/persodatas/PersoDataForm'
import PersoDataList from '../components/main/private/account/persodatas/PersoDataList'

const StyledGrid = styled(Grid)(() => ({
  margin: '1rem 0px',
}))

function PrivateAccountDonneesScreen() {
  const [data, setData] = useState(null)
  const [toggle, setToggle] = useState('list')
  const [form, setForm] = useState({
    credentialsform: false,
    childrenform: false,
    rolesform: false,
    passwordform: false,
    usnubscribeform: false,
    statusform: false,
    gradeform: false,
  })

  return (
    <StyledGrid container>
      <PersoDataList
        setForm={setForm}
        form={form}
        toggle={toggle}
        setToggle={setToggle}
        setData={setData}
      />

      {toggle === 'form' && (
        <PersoDataForm
          setForm={setForm}
          toggle={toggle}
          setToggle={setToggle}
          form={form}
          data={data}
        />
      )}
    </StyledGrid>
  )
}

export default PrivateAccountDonneesScreen
