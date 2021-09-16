import { Grid, styled } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AlertCollapse from '../components/elements/AlertCollapse'
import PersoDataForm from '../components/main/private/account/persodatas/PersoDataForm'
import PersoDataList from '../components/main/private/account/persodatas/PersoDataList'
import {
  setPrivateAccountFetchAlert,
  setPrivateAccountMutateAlert,
} from '../redux/alerts/AlertsActions'
import { initialAlertCollapse } from '../constants/alerts'

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

  const { privateAccountMutate, privateAccountFetch } = useSelector(
    (state) => state.alerts
  )

  const collapseMutateCallback = () => {
    dispatch(setPrivateAccountMutateAlert(initialAlertCollapse))
  }
  const collapseFetchCallback = () => {
    dispatch(setPrivateAccountFetchAlert(initialAlertCollapse))
  }

  // eslint-disable-next-line arrow-body-style
  useEffect(() => {
    return () => {
      collapseMutateCallback()
      collapseFetchCallback()
    }
  }, [])

  return (
    <StyledGrid container>
      <Grid item container>
        <AlertCollapse
          {...privateAccountMutate}
          callback={collapseMutateCallback}
        />
      </Grid>
      <Grid item container>
        <AlertCollapse {...privateAccountFetch} />
      </Grid>

      <Grid item container>
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
      </Grid>
    </StyledGrid>
  )
}

export default PrivateAccountDonneesScreen
