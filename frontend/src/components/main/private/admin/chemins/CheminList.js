import React from 'react'
import PropTypes from 'prop-types'
import { Grid } from '@material-ui/core'
import { useQuery } from 'react-query'
import { apiFetchChemin } from '../../../../../utils/api'
import AlertCollapse from '../../../../elements/AlertCollapse'
import Chemin from './Chemin'

function CheminList({ queryKey, setShowAddForm, setTopAlert }) {
  const { isLoading, isError, data, error } = useQuery(queryKey, () =>
    apiFetchChemin()
  )

  return (
    <Grid item container>
      {isLoading && (
        <Grid item container>
          <AlertCollapse
            openAlert={isLoading}
            severity="warning"
            alertText="Chargement de la liste ..."
          />
        </Grid>
      )}
      {isError && (
        <Grid item container>
          <AlertCollapse
            openAlert={isError}
            severity="error"
            alertText={error.response.data.message}
          />
        </Grid>
      )}
      {Array.isArray(data) &&
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
export default CheminList
