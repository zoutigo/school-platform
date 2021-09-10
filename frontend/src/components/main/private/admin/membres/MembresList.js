import React, { useEffect } from 'react'
import PropTypes, { resetWarningCache } from 'prop-types'
import { Grid } from '@material-ui/core'
import { useQuery } from 'react-query'
import { useDispatch } from 'react-redux'
import { apiFetchMembres } from '../../../../../utils/api'
import useFetchDispatch from '../../../../elements/useFetchDispatch'
import { setMembresFetchAlert } from '../../../../../redux/alerts/AlertsActions'
import Membre from './Membre'

function MembresList({ queryKey, queryParams }) {
  const dispatch = useDispatch()
  const { isLoading, isError, data, error } = useQuery(queryKey, () =>
    apiFetchMembres(queryParams)
  )

  // hook to dispatch alerts
  useFetchDispatch(isLoading, isError, error, data, setMembresFetchAlert)

  useEffect(() => {
    if (data && Array.isArray(data) && data.length < 1) {
      dispatch(
        setMembresFetchAlert({
          openAlert: true,
          severity: resetWarningCache,
          alertText: 'Aucun utilateur trouvé pour cette adresse mail',
        })
      )
    }
  }, [data])
  return (
    <Grid item container>
      {Array.isArray(data) &&
        data.length > 0 &&
        data.map((membre) => <Membre key={membre.id} membre={membre} />)}
    </Grid>
  )
}

MembresList.defaultProps = {
  queryKey: null,
  queryParams: null,
}

MembresList.propTypes = {
  queryKey: PropTypes.arrayOf(PropTypes.string),
  queryParams: PropTypes.string,
}

export default MembresList
