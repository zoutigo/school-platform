import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Grid, Collapse, Tooltip, Fab, styled } from '@material-ui/core'
import ReceiptIcon from '@material-ui/icons/Receipt'
import EditIcon from '@material-ui/icons/Edit'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import StyledParametresGrid from '../../../../../styled-components/StyledPrametresGrid'
import Title from '../../../../../elements/Title'
import ManageMailList from './ManageMailList'
import ManageMailForm from './ManageMailForm'

const StyledDeleteFab = styled(Fab)(({ theme }) => ({
  margin: theme.spacing(1),
  color: theme.palette.secondary.main,
  background: 'white',
}))

function ManageMail({ setShowParams }) {
  const [showForm, setShowForm] = useState(false)
  const [formAction, setFormAction] = useState('create')
  const [currentMail, setCurrentMail] = useState(null)
  const [showParametresDetails, setShowParametresDetails] = useState(false)
  const queryKey = ['sent-email-list']
  const queryParams = ``

  const handleClick = () => {
    setCurrentMail(null)
    setFormAction('create')
    setShowForm(!showForm)
  }

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
          <Title title="gestion des mails admin" />
        </Grid>

        {showParametresDetails && (
          <Grid item xs={1} style={{ textAlign: 'right' }}>
            <Tooltip
              title="Envoyer un mail"
              aria-label="Envoyer un mail"
              onClick={handleClick}
            >
              <StyledDeleteFab size="small">
                {showForm ? <ReceiptIcon /> : <AddCircleIcon />}
              </StyledDeleteFab>
            </Tooltip>
          </Grid>
        )}
      </Grid>
      <Collapse in={showParametresDetails} style={{ width: '100%' }}>
        {!showForm ? (
          <Grid item container>
            <ManageMailList
              setShowForm={setShowForm}
              queryKey={queryKey}
              queryParams={queryParams}
              setFormAction={setFormAction}
              setCurrentMail={setCurrentMail}
            />
          </Grid>
        ) : (
          <Grid item container>
            <ManageMailForm
              setShowForm={setShowForm}
              setShowParams={setShowParams}
              queryKey={queryKey}
              formAction={formAction}
              currentMail={currentMail}
              setCurrentMail={setCurrentMail}
            />
          </Grid>
        )}
      </Collapse>
    </StyledParametresGrid>
  )
}

ManageMail.propTypes = {
  setShowParams: PropTypes.func.isRequired,
}

export default ManageMail
