import React, { useState } from 'react'
import PropTypes from 'prop-types'
import ReceiptIcon from '@material-ui/icons/Receipt'
import EditIcon from '@material-ui/icons/Edit'
import { Grid, Collapse, Tooltip, Fab, styled } from '@material-ui/core'
import StyledParametresGrid from '../../../../../styled-components/StyledPrametresGrid'
import Title from '../../../../../elements/Title'
import ManageParamsList from './ManageParamsList'
import ManageParamsForm from './ManageParamsForm'

const StyledDeleteFab = styled(Fab)(({ theme }) => ({
  margin: theme.spacing(1),
  color: theme.palette.secondary.main,
  background: 'white',
}))

function ManageParams({ setShowParams }) {
  const [showParametresDetails, setShowParametresDetails] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const queryKey = ['parametres']
  return (
    <StyledParametresGrid item container>
      <Grid item container justifyContent="space-between">
        <Grid
          item
          xs={11}
          onClick={() => setShowParametresDetails(!showParametresDetails)}
          role="presentation"
          className="title"
        >
          <Title title="gestion des parametres" />
        </Grid>
        {showParametresDetails && (
          <Grid item xs={1} style={{ textAlign: 'right' }}>
            <Tooltip
              title="modifier les parametres actuels"
              aria-label="Modifier les parametres actuels"
              onClick={() => setShowForm(!showForm)}
            >
              <StyledDeleteFab size="small">
                {showForm ? <ReceiptIcon /> : <EditIcon />}
              </StyledDeleteFab>
            </Tooltip>
          </Grid>
        )}
      </Grid>
      <Collapse in={showParametresDetails} style={{ width: '100%' }}>
        {!showForm ? (
          <Grid item container>
            <ManageParamsList setShowForm={setShowForm} queryKey={queryKey} />
          </Grid>
        ) : (
          <Grid item container>
            <ManageParamsForm
              setShowForm={setShowForm}
              setShowParams={setShowParams}
              queryKey={queryKey}
            />
          </Grid>
        )}
      </Collapse>
    </StyledParametresGrid>
  )
}

ManageParams.propTypes = {
  setShowParams: PropTypes.func.isRequired,
}

export default ManageParams
