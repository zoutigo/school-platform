import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Grid, Box, Typography } from '@material-ui/core'

import { StyledPaperHeader } from '../elements/styled'

function PaperItemHeader({ setCurrentDocument, paperItem }) {
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
          <Typography variant="caption">
            Date:
            {moment(paperItem ? paperItem.createdat : null).format(
              'DD/MM/YYYY'
            )}
          </Typography>
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
  paperItem: PropTypes.shape({
    _id: PropTypes.string,
    text: PropTypes.string,
    name: PropTypes.string,
    title: PropTypes.string,
    entity: PropTypes.shape({
      name: PropTypes.string,
    }),
    createdat: PropTypes.number,
  }).isRequired,
}

export default PaperItemHeader
