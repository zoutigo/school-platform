import React from 'react'
import PropTypes from 'prop-types'
import { Grid } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'
import { apiFetchMembres } from '../../../../../utils/api'
import Membre from './Membre'
import useFetch from '../../../../hooks/useFetch'
import AlertMessage from '../../../../elements/AlertMessage'

function MembresList({ queryKey, queryParams }) {
  const { isLoading, isError, data, errorMessage } = useFetch(
    queryKey,
    queryParams,
    apiFetchMembres
  )

  return (
    <Grid item container>
      {isError && <AlertMessage severity="error" message={errorMessage} />}
      {isLoading && <CircularProgress color="secondary" />}
      {data &&
        data.data &&
        data.data.datas &&
        Array.isArray(data.data.datas) &&
        data.data.datas.length > 0 &&
        data.data.datas.map((membre) => (
          <Membre key={membre.uuid} membre={membre} queryKey={queryKey} />
        ))}
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
