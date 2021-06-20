import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Grid, Box, Typography } from '@material-ui/core'

import { StyledPaperHeader } from '../elements/styled'

function PaperItemHeader({
  setCurrentDocument,
  paperItem,
  title,
  createdat,
  entity,
}) {
  return (
    <StyledPaperHeader
      item
      container
      onClick={() => setCurrentDocument(paperItem)}
    >
      <Grid item container>
        <Typography variant="body1">{title}</Typography>
      </Grid>
      <Grid item container justify="space-between">
        <Box>
          <Typography variant="caption">
            Date:
            {moment(createdat).format('DD/MM/YYYY')}
          </Typography>
        </Box>
        <Box>
          <Typography variant="caption">{entity.name}</Typography>
        </Box>
      </Grid>
    </StyledPaperHeader>
  )
}
PaperItemHeader.defaultProps = {
  entity: {
    name: 'Le secretariat',
  },
}

PaperItemHeader.propTypes = {
  setCurrentDocument: PropTypes.func.isRequired,
  paperItem: PropTypes.shape({
    _id: PropTypes.string,
    text: PropTypes.string,
    title: PropTypes.string,
    entity: PropTypes.string,
    createdat: PropTypes.number,
  }).isRequired,
  title: PropTypes.string.isRequired,
  createdat: PropTypes.string.isRequired,
  entity: PropTypes.shape({
    name: PropTypes.string,
  }),
}

export default PaperItemHeader
