import React from 'react'
import PropTypes from 'prop-types'
import { Grid } from '@material-ui/core'
import { apiFetchChemin } from '../../../../../utils/api'
import Chemin from './Chemin'
import useFetch from '../../../../hooks/useFetch'
import AlertMessage from '../../../../elements/AlertMessage'
import FetchCircularProgress from '../../../../elements/FetchCircularProgress'

function CheminList({ queryKey, setShowAddForm }) {
  // const { isLoading, isError, data, error } = useQuery(queryKey, () =>
  //   apiFetchChemin()
  // )
  const queryParams = ''
  const { isLoading, isError, data, errorMessage } = useFetch(
    queryKey,
    queryParams,
    apiFetchChemin
  )

  return (
    <Grid item container>
      {isError && <AlertMessage severity="error" message={errorMessage} />}
      {isLoading && <FetchCircularProgress color="secondary" />}
      {data &&
        Array.isArray(data) &&
        data.map((chemin) => (
          <Chemin
            item
            container
            key={chemin.id}
            chemin={chemin}
            queryKey={queryKey}
            setShowAddForm={setShowAddForm}
          />
        ))}
    </Grid>
  )
}

CheminList.propTypes = {
  queryKey: PropTypes.arrayOf(PropTypes.string).isRequired,
  setShowAddForm: PropTypes.func.isRequired,
}
export default React.memo(CheminList)
