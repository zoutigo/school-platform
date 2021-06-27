import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Grid, Box, Typography } from '@material-ui/core'

import { StyledPaperHeader } from '../elements/styled'

function PaperItemHeader({ setCurrentDocument, paperItem, paper }) {
  return (
    <StyledPaperHeader
      item
      container
      onClick={() => setCurrentDocument(paperItem)}
    >
      <Grid item container>
        <Typography variant="body1">
          {paperItem ? paperItem.title : null}
        </Typography>
      </Grid>
      <Grid item container justify="space-between">
        <Box>
          {paper.paperType === 'event' && (
            <Typography variant="caption">
              Aura lieu le: &nbsp;&nbsp;
              {moment(paperItem ? paperItem.date : null).format('DD/MM/YYYY')}
            </Typography>
          )}
          {paper.paperType === 'activite' && (
            <Typography variant="caption">
              {moment(paperItem ? paperItem.date : null).format('DD/MM/YYYY')}
            </Typography>
          )}
        </Box>
        <Box>
          <Typography variant="caption">
            {paperItem ? paperItem.entity.name : null}
          </Typography>
        </Box>
      </Grid>
    </StyledPaperHeader>
  )
}

PaperItemHeader.propTypes = {
  setCurrentDocument: PropTypes.func.isRequired,
  paper: PropTypes.shape({
    paperType: PropTypes.string,
  }).isRequired,
  paperItem: PropTypes.shape({
    _id: PropTypes.string,
    text: PropTypes.string,
    name: PropTypes.string,
    title: PropTypes.string,
    date: PropTypes.number,
    entity: PropTypes.shape({
      name: PropTypes.string,
    }),
    createdat: PropTypes.number,
  }).isRequired,
}

export default PaperItemHeader
