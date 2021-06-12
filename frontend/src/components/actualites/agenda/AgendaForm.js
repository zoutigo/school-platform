import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Grid } from '@material-ui/core'
import PropTypes from 'prop-types'

function AgendaForm({ events, currentEventId }) {
  console.log('events', events)
  console.log('currentId:', currentEventId)
  const [event, setEvent] = useState(null)

  useEffect(() => {
    if (currentEventId) {
      const myEvent = events.find((ev) => ev._id === currentEventId)
      setEvent(myEvent)
    }
    return () => {
      setEvent(null)
    }
  }, [])
  return (
    <Grid item container>
      {event?.place}
    </Grid>
  )
}

AgendaForm.defaultProps = {
  currentEventId: null,
  events: [],
}

AgendaForm.propTypes = {
  currentEventId: PropTypes.string,
  events: PropTypes.arrayOf(
    PropTypes.shape({
      place: PropTypes.string,
      createdat: PropTypes.string,
      _id: PropTypes.string,
      title: PropTypes.string,
      text: PropTypes.string,
      author: PropTypes.string,
    })
  ),
}

export default AgendaForm
