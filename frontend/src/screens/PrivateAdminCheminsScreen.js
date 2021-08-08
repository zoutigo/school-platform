import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { styled, Grid } from '@material-ui/core'
import CheminForm from '../components/main/private/admin/chemins/CheminForm'
import CheminList from '../components/main/private/admin/chemins/CheminList'
import ToggleToolTip from '../components/elements/ToggleToolTip'
import AlertCollapse from '../components/elements/AlertCollapse'
import { setFetchAlert, setMutateAlert } from '../redux/alerts/AlertsActions'
import { initialAlertCollapse } from '../constants/alerts'

const StyledGrid = styled(Grid)(() => ({
  margin: '1rem 0px',
}))
function PrivateAdminCheminsScreen() {
  const dispatch = useDispatch()
  const queryKey = ['list-chemins']
  const [showAddForm, setShowAddForm] = useState(false)
  const [topAlert, setTopAlert] = useState({
    openAlert: false,
    severity: 'error',
    alertText: '',
  })

  const { mutate, fetch } = useSelector((state) => state.alerts)
  const mutateCallback = useCallback(() => {
    dispatch(setMutateAlert(initialAlertCollapse))
  }, [])
  const fetchCallback = useCallback(() => {
    dispatch(setFetchAlert(initialAlertCollapse))
  }, [])

  useEffect(() => {
    const ana = 'ana'
    return () => {
      mutateCallback()
      fetchCallback()
    }
  }, [])

  return (
    <StyledGrid container>
      <Grid item container>
        <AlertCollapse {...mutate} callback={mutateCallback} />
        <AlertCollapse {...fetch} callback={fetchCallback} />
      </Grid>
      <ToggleToolTip
        init
        staticText="Ajouter un chemin"
        activeText="Annuler"
        toggleValue={showAddForm}
        callback={setShowAddForm}
        action="add"
      />
      {showAddForm && (
        <CheminForm
          queryKey={queryKey}
          formAction="create"
          setShowAddForm={setShowAddForm}
        />
      )}

      <CheminList
        queryKey={queryKey}
        setShowAddForm={setShowAddForm}
        setTopAlert={setTopAlert}
      />
    </StyledGrid>
  )
}

export default React.memo(PrivateAdminCheminsScreen)
