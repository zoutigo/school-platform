import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Grid } from '@material-ui/core'
import { useQuery } from 'react-query'
import { useDispatch } from 'react-redux'
import { apiFetchChemin } from '../../../../../utils/api'
import Chemin from './Chemin'
import { setFetchAlert } from '../../../../../redux/alerts/AlertsActions'
import {
  errorAlertCollapse,
  initialAlertCollapse,
  loadingAlertCollapse,
} from '../../../../../constants/alerts'

function CheminList({ queryKey, setShowAddForm, setTopAlert }) {
  const dispatch = useDispatch()
  const { isLoading, isError, data, error } = useQuery(queryKey, () =>
    apiFetchChemin()
  )

  useEffect(() => {
    if (isLoading) {
      dispatch(setFetchAlert(loadingAlertCollapse))
    }
    if (isError) {
      dispatch(setFetchAlert(errorAlertCollapse(error.response.data.message)))
    }
    if (data && Array.isArray(data)) {
      dispatch(setFetchAlert(initialAlertCollapse))
    }
  }, [isLoading, isError])

  return (
    <Grid item container>
      {data &&
        Array.isArray(data) &&
        data.map((chemin) => (
          <Chemin
            item
            container
            key={chemin._id}
            chemin={chemin}
            queryKey={queryKey}
            setTopAlert={setTopAlert}
            setShowAddForm={setShowAddForm}
          />
        ))}
    </Grid>
  )
}

CheminList.propTypes = {
  queryKey: PropTypes.arrayOf(PropTypes.string).isRequired,
  setShowAddForm: PropTypes.func.isRequired,
  setTopAlert: PropTypes.func.isRequired,
}
export default React.memo(CheminList)
