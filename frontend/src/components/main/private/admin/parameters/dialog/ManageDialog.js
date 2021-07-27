import React, { useState } from 'react'
import PropTypes from 'prop-types'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import { Grid, Collapse, Tooltip, styled, Fab } from '@material-ui/core'
import ManageDialogList from './ManageDialogList'
import ManageDialogForm from './ManageDialogForm'
import Title from '../../../../../elements/Title'

const StyledDeleteFab = styled(Fab)(({ theme }) => ({
  margin: theme.spacing(1),
  color: theme.palette.secondary.main,
  background: 'white',
}))

const StyledGrid = styled(Grid)(({ theme }) => ({
  border: `solid 1px ${theme.palette.secondary.main}`,
  padding: '0.5rem',
  borderRadius: '5px',
  '& >:first-child': {
    background: theme.palette.secondary.light,
    '& .title': {
      cursor: 'pointer',
      padding: '0px 0.5rem',
      '& :hover': {
        opacity: '0.2',
      },
    },
  },
}))

function ManageDialog({ setShowParams }) {
  const [showDialogDetails, setShowDialogDetails] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const queryKey = ['dialogs']

  return (
    <StyledGrid item container>
      <Grid item container justify="space-between">
        <Grid
          item
          xs={11}
          onClick={() => setShowDialogDetails(!showDialogDetails)}
          role="presentation"
          className="title"
        >
          <Title title="gestion des modales" />
        </Grid>
        {showDialogDetails && (
          <Grid item xs={1} style={{ textAlign: 'right' }}>
            <Tooltip
              title="Creer une Modale"
              aria-label="créer"
              onClick={() => setShowForm(!showForm)}
            >
              <StyledDeleteFab size="small">
                <AddCircleIcon />
              </StyledDeleteFab>
            </Tooltip>
          </Grid>
        )}
      </Grid>
      <Collapse in={showDialogDetails}>
        {!showForm ? (
          <Grid item container>
            <ManageDialogList setShowForm={setShowForm} queryKey={queryKey} />
          </Grid>
        ) : (
          <Grid item container>
            <ManageDialogForm
              setShowForm={setShowForm}
              setShowParams={setShowParams}
              queryKey={queryKey}
            />
          </Grid>
        )}
      </Collapse>
    </StyledGrid>
  )
}

ManageDialog.propTypes = {
  setShowParams: PropTypes.func.isRequired,
}

export default ManageDialog
