import { Fab, Grid, styled, Tooltip } from '@material-ui/core'
import { useQuery } from 'react-query'
import React, { useState } from 'react'
import AddIcon from '@material-ui/icons/Add'
import { apiFetchEvents } from '../utils/api'
import ApiAlert from '../components/elements/ApiAlert'
import AgendaList from '../components/actualites/agenda/AgendaList'
import AgendaForm from '../components/actualites/agenda/AgendaForm'
import AlertCollapse from '../components/elements/AlertCollapse'

const StyledFab = styled(Fab)(({ theme }) => ({
  position: 'absolute',
  bottom: theme.spacing(2),
  right: theme.spacing(3),
  background: theme.palette.success.main,
}))

function InformationsActualitesAgendaScreen() {
  const [showEventForm, setShowEventForm] = useState(false)
  const [showEventList, setShowEventList] = useState(true)
  const [showTooltip, setShowTooltip] = useState(true)
  const [currentEventId, setCurrentEventId] = useState(null)
  const [formAction, setFormAction] = useState(null)
  const [topAlert, setTopAlert] = useState({
    severity: '',
    alertText: '',
    openAlert: false,
  })

  const pageName = 'events'
  const queryKey = [pageName]
  const queryParams = ''

  const { isLoading, isError, data, error } = useQuery(queryKey, () =>
    apiFetchEvents(queryParams)
  )

  return (
    <Grid container>
      {topAlert.openAlert && (
        <Grid item container>
          <AlertCollapse
            alertText={topAlert.alertText}
            openAlert
            severity={topAlert.severity}
            callback={setTopAlert}
          />
        </Grid>
      )}
      {isLoading && (
        <Grid item container>
          <ApiAlert severity="warning">Chargement ...</ApiAlert>
        </Grid>
      )}
      {isError && (
        <Grid item container>
          <ApiAlert severity="error">{error.message}</ApiAlert>{' '}
        </Grid>
      )}
      {showEventList && Array.isArray(data) && (
        <AgendaList
          data={data}
          setShowEventForm={setShowEventForm}
          setShowEventList={setShowEventList}
          queryKey={queryKey}
          setTopAlert={setTopAlert}
          setCurrentEventId={setCurrentEventId}
          setFormAction={setFormAction}
        />
      )}
      {showEventForm && (
        <AgendaForm
          events={data}
          currentEventId={currentEventId}
          queryKey={queryKey}
          setTopAlert={setTopAlert}
          setShowTooltip={setShowTooltip}
          setFormAction={setFormAction}
          formAction={formAction}
        />
      )}
      {showTooltip && (
        <Tooltip
          title="Ajouter un évènement"
          placement="bottom-end"
          aria-label="Ajouter un évènement"
        >
          <StyledFab
            onClick={() => {
              setShowEventForm(true)
              setShowEventList(false)
              setFormAction('create')
            }}
          >
            <AddIcon />
          </StyledFab>
        </Tooltip>
      )}
    </Grid>
  )
}

export default InformationsActualitesAgendaScreen
