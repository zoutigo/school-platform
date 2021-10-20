import React from 'react'
import { Grid, styled } from '@material-ui/core'
import PropTypes from 'prop-types'
import CircularProgress from '@material-ui/core/CircularProgress'

import { apiFetchDialogs } from '../../../../../../utils/api'
import DialogItem from './DialogItem'
import useFetch from '../../../../../hooks/useFetch'
import AlertMessage from '../../../../../elements/AlertMessage'

const StyledGrid = styled(Grid)(() => ({
  padding: '0.5rem 0',
}))

function ManageDialogList({ queryKey }) {
  const queryParams = ''

  const { isLoading, isError, data, errorMessage } = useFetch(
    queryKey,
    queryParams,
    apiFetchDialogs
  )

  return (
    <StyledGrid container>
      {isError && <AlertMessage severity="error" message={errorMessage} />}
      {isLoading && <CircularProgress color="secondary" />}
      {Array.isArray(data) &&
        data.length > 0 &&
        data.map((dialog) => (
          <DialogItem dialog={dialog} key={dialog.id} queryKey={queryKey} />
        ))}
    </StyledGrid>
  )
}

ManageDialogList.propTypes = {
  queryKey: PropTypes.arrayOf(PropTypes.string).isRequired,
}
export default ManageDialogList
