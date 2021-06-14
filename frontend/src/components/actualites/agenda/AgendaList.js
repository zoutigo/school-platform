import React, { useState } from 'react'
import { Grid, Box, Typography, Collapse, styled } from '@material-ui/core'
import PropTypes from 'prop-types'
import moment from 'moment'
import ReactHtmlParser from 'react-html-parser'
import { StyledPaperHeader, StyledPaperBody } from '../../elements/styled'
import AgendaItemFooter from './AgendaItemFooter'

const StyledGrid = styled(Grid)(() => ({
  padding: '0.5rem 0',
}))

const StyledPaper = styled(Grid)(() => ({
  boxShadow: `rgba(0, 0, 0, 0.35) 0px 5px 15px`,
  marginBottom: '1rem',
  padding: '0.1rem 0.5rem',
  borderRadius: '6px',
}))

function AgendaList({
  data,
  setShowEventForm,
  setShowEventList,
  setCurrentEventId,
  queryKey,
  setTopAlert,
  setFormAction,
}) {
  const [openedItemId, setOpenedItemId] = useState(null)
  // const dateString = moment(date).format('DD/MM/YYYY')
  return (
    <StyledGrid item container>
      {data.length > 0 &&
        data.map((event, index) => {
          const { _id, place, title, date, text } = event
          if (index === 0 && !openedItemId) {
            setOpenedItemId(_id)
          }
          return (
            <StyledPaper item container key={_id}>
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
                    setShowEventList={setShowEventList}
                    queryKey={queryKey}
                    setTopAlert={setTopAlert}
                    setCurrentEventId={setCurrentEventId}
                    setFormAction={setFormAction}
                  />
                </Collapse>
              </Grid>
            </StyledPaper>
          )
        })}
    </StyledGrid>
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
  setShowEventList: PropTypes.func.isRequired,
  setCurrentEventId: PropTypes.func.isRequired,
  queryKey: PropTypes.arrayOf(PropTypes.string).isRequired,
  setTopAlert: PropTypes.func.isRequired,
  setFormAction: PropTypes.func.isRequired,
}

export default AgendaList
