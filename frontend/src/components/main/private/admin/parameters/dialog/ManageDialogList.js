import React from 'react'
import { Grid, styled } from '@material-ui/core'
import PropTypes from 'prop-types'
import { useQuery } from 'react-query'
import { apiFetchDialogs } from '../../../../../../utils/api'
import { setParametersFetchAlert } from '../../../../../../redux/alerts/AlertsActions'
import useFetchDispatch from '../../../../../elements/useFetchDispatch'
import DialogItem from './DialogItem'

const StyledGrid = styled(Grid)(() => ({
  padding: '0.5rem 0',
}))

function ManageDialogList({ queryKey }) {
  const { isLoading, isError, data, error } = useQuery(queryKey, () =>
    apiFetchDialogs()
  )

  // hook to dispatch alerts
  useFetchDispatch(isLoading, isError, error, data, setParametersFetchAlert)

  return (
    <StyledGrid container>
      {Array.isArray(data) &&
        data.length > 0 &&
        data.map((dialog) => (
          <DialogItem dialog={dialog} key={dialog._id} queryKey={queryKey} />
        ))}
    </StyledGrid>
  )
}

ManageDialogList.propTypes = {
  queryKey: PropTypes.arrayOf(PropTypes.string).isRequired,
}
export default ManageDialogList
