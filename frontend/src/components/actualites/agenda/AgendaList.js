import React, { useState } from 'react'
import { Grid, Box, Typography, Collapse } from '@material-ui/core'
import PropTypes from 'prop-types'
import moment from 'moment'
import ReactHtmlParser from 'react-html-parser'
import { StyledPaperHeader, StyledPaperBody } from '../../elements/styled'
import AgendaItemFooter from './AgendaItemFooter'

function AgendaList({ data, setShowEventForm }) {
  const [openedItemId, setOpenedItemId] = useState(null)
  // const dateString = moment(date).format('DD/MM/YYYY')
  return (
    <Grid item container>
      {data.length > 0 &&
        data.map((event, index) => {
          const { _id, place, createdat, title, date, text, author } = event
          if (index === 0 && !openedItemId) {
            setOpenedItemId(_id)
          }
          return (
            <Grid item container key={_id}>
              <StyledPaperHeader
                item
                container
                onClick={() => setOpenedItemId(_id)}
              >
                <Grid item container>
                  <Typography variant="body1">{title}</Typography>
                </Grid>
                <Grid item container justify="space-between">
                  <Box>
                    <Typography variant="caption">
                      Date:
                      {moment(date).format('DD/MM/YYYY')}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption">{place}</Typography>
                  </Box>
                </Grid>
              </StyledPaperHeader>
              <Grid item container>
                <Collapse in={openedItemId === _id}>
                  <StyledPaperBody item container>
                    {ReactHtmlParser(text) || "il n'y a pas plus de détails"}
                  </StyledPaperBody>
                  <AgendaItemFooter
                    event={event}
                    setShowEventForm={setShowEventForm}
                  />
                </Collapse>
              </Grid>
            </Grid>
          )
        })}
    </Grid>
  )
}

AgendaList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      place: PropTypes.string,
      createdat: PropTypes.string,
      _id: PropTypes.string,
      title: PropTypes.string,
      text: PropTypes.string,
      author: PropTypes.string,
    })
  ).isRequired,
  setShowEventForm: PropTypes.func.isRequired,
}

export default AgendaList
