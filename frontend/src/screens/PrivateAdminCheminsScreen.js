import React, { useState } from 'react'
import { styled, Grid } from '@material-ui/core'
import CheminForm from '../components/main/private/admin/chemins/CheminForm'
import CheminList from '../components/main/private/admin/chemins/CheminList'
import ToggleToolTip from '../components/elements/ToggleToolTip'

const StyledGrid = styled(Grid)(() => ({
  margin: '1rem 0px',
}))
function PrivateAdminCheminsScreen() {
  const queryKey = ['list-chemins']
  const [showAddForm, setShowAddForm] = useState(false)

  return (
    <StyledGrid container>
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

      <CheminList queryKey={queryKey} setShowAddForm={setShowAddForm} />
    </StyledGrid>
  )
}

export default React.memo(PrivateAdminCheminsScreen)
