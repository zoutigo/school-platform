import { Grid } from '@material-ui/core'
import { useQuery } from 'react-query'
import React, { useState } from 'react'
import { apiFetchEvents } from '../utils/api'
import ApiAlert from '../components/elements/ApiAlert'
import AgendaList from '../components/actualites/agenda/AgendaList'
import AgendaForm from '../components/actualites/agenda/AgendaForm'

function InformationsActualitesAgendaScreen() {
  const [showEventForm, setShowEventForm] = useState(false)
  const [showEventList, setShowEventList] = useState(true)

  const pageName = 'events'
  const queryKey = [pageName]
  const queryParams = ''

  const { isLoading, isError, data, error } = useQuery(queryKey, () =>
    apiFetchEvents(queryParams)
  )

  if (isLoading) {
    return <ApiAlert severity="warning">Chargement ...</ApiAlert>
  }

  if (isError) {
    return <ApiAlert severity="error">{error.message}</ApiAlert>
  }

  if (!Array.isArray(data)) {
    return null
  }

  console.log('datas:', data)

  return (
    <Grid container>
      {showEventList && (
        <AgendaList data={data} setShowEventForm={setShowEventForm} />
      )}
      {showEventForm && <AgendaForm />}
    </Grid>
  )
}

export default InformationsActualitesAgendaScreen
