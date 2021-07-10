import { Grid, styled } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AlertCollapse from '../components/elements/AlertCollapse'
import PersoDataForm from '../components/main/private/account/persodatas/PersoDataForm'
import PersoDataList from '../components/main/private/account/persodatas/PersoDataList'
import { setPrivateAccountMutateAlert } from '../redux/alerts/AlertsActions'

const StyledGrid = styled(Grid)(() => ({
  margin: '1rem 0px',
}))

function PrivateAccountDonneesScreen() {
  const dispatch = useDispatch()
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

  const { privateAccountDatasMutate } = useSelector((state) => state.alerts)

  const [fetchAlert, setFetchAlert] = useState({
    openAlert: false,
    severity: 'error',
    alertText: '',
  })

  const collapseMutateCallback = () => {
    dispatch(
      setPrivateAccountMutateAlert({
        openAlert: false,
        severity: 'error',
        alertText: '',
      })
    )
  }

  // eslint-disable-next-line arrow-body-style
  useEffect(() => {
    return () => collapseMutateCallback()
  }, [])

  return (
    <StyledGrid container>
      <Grid item container>
        <AlertCollapse
          {...privateAccountDatasMutate}
          callback={collapseMutateCallback}
        />
      </Grid>
      <Grid item container>
        <AlertCollapse {...fetchAlert} />
      </Grid>

      <Grid item container>
        <PersoDataList
          setForm={setForm}
          form={form}
          toggle={toggle}
          setToggle={setToggle}
          setFetchAlert={setFetchAlert}
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
      </Grid>
    </StyledGrid>
  )
}

export default PrivateAccountDonneesScreen
