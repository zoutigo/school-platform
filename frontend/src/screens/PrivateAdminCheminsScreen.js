import React, { useState } from 'react'
import { styled, Grid } from '@material-ui/core'
import CheminForm from '../components/main/private/admin/chemins/CheminForm'
import CheminList from '../components/main/private/admin/chemins/CheminList'
import ToggleToolTip from '../components/elements/ToggleToolTip'
import AlertCollapse from '../components/elements/AlertCollapse'

const StyledGrid = styled(Grid)(() => ({
  margin: '1rem 0px',
}))
function PrivateAdminCheminsScreen() {
  const queryKey = ['liste-chemins']
  const [showAddForm, setShowAddForm] = useState(false)
  const [topAlert, setTopAlert] = useState({
    openAlert: false,
    severity: 'error',
    alertText: '',
  })

  return (
    <StyledGrid container>
      <Grid item container>
        <AlertCollapse
          openAlert={topAlert.openAlert}
          severity={topAlert.severity}
          alertText={topAlert.alertText}
        />
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
          setTopAlert={setTopAlert}
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

export default PrivateAdminCheminsScreen
