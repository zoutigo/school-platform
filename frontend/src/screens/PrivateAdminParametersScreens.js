import { styled, Grid } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  setParametersFetchAlert,
  setParametersMutateAlert,
} from '../redux/alerts/AlertsActions'
import { initialAlertCollapse } from '../constants/alerts'
import AlertCollapse from '../components/elements/AlertCollapse'
import ManageDialog from '../components/main/private/admin/parameters/dialog/ManageDialog'
import ManageParams from '../components/main/private/admin/parameters/params/ManageParams'

const StyledGrid = styled(Grid)(() => ({
  margin: '1rem 0px',
}))

function PrivateAdminParametersScreens() {
  const dispatch = useDispatch()
  const [showParams, setShowParams] = useState({
    dialog: true,
    parameters: true,
  })
  const { parametersMutate, parametersFetch } = useSelector(
    (state) => state.alerts
  )

  const collapseMutateCallback = () => {
    dispatch(setParametersMutateAlert(initialAlertCollapse))
  }
  const collapseFetchCallback = () => {
    dispatch(setParametersFetchAlert(initialAlertCollapse))
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
          {...parametersMutate}
          callback={collapseMutateCallback}
        />
      </Grid>
      <Grid item container>
        <AlertCollapse {...parametersFetch} callback={collapseFetchCallback} />
      </Grid>
      <Grid item container>
        {showParams.dialog && <ManageDialog setShowParams={setShowParams} />}
        {/* {showParams.parameters && (
          <ManageParams setShowparams={setShowParams} />
        )} */}
      </Grid>
    </StyledGrid>
  )
}

export default PrivateAdminParametersScreens
