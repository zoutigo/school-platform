import React from 'react'
import { Grid } from '@material-ui/core'
import PropTypes from 'prop-types'

function PaperSearchList({
  paper,
  setShowEventForm,
  setShowEventList,
  setCurrentEventId,
  queryKey,
  setTopAlert,
  setFormAction,
  setShowSearch,
}) {
  return (
    <Grid item container>
      {' '}
      Paper search list
    </Grid>
  )
}

PaperSearchList.propTypes = {
  paper: PropTypes.shape({
    queryKey: PropTypes.string.isRequired,
    queryParams: PropTypes.arrayOf(PropTypes.string),
    paperName: PropTypes.string.isRequired,
    paperFormat: PropTypes.string.isRequired,
    paperType: PropTypes.string.isRequired,
    entityAlias: PropTypes.string.isRequired,
    isAllowedToChange: PropTypes.bool.isRequired,
  }).isRequired,
  setShowEventForm: PropTypes.func.isRequired,
  setShowEventList: PropTypes.func.isRequired,
  setCurrentEventId: PropTypes.func.isRequired,
  queryKey: PropTypes.arrayOf(PropTypes.string).isRequired,
  setTopAlert: PropTypes.func.isRequired,
  setFormAction: PropTypes.func.isRequired,
  setShowSearch: PropTypes.bool.isRequired,
}

export default PaperSearchList
