import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Grid } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'
import { apiFecthPage } from '../../utils/api'
import PageScreen from '../elements/reactpage/PageScreen'
import AlertMessage from '../elements/AlertMessage'
import useFetch from '../hooks/useFetch'

function PageList({ pageParams, setPage }) {
  const { isLoading, isError, data, errorMessage } = useFetch(
    pageParams.queryKey,
    pageParams.queryParams,
    apiFecthPage
  )

  useEffect(() => {
    if (data) {
      if (Array.isArray(data)) {
        const [result] = data
        setPage(result)
      }
    }
  }, [data])

  return (
    <Grid item container className="react-editor-read" data-testid="page-list">
      {isError && <AlertMessage severity="error" message={errorMessage} />}
      {isLoading && <CircularProgress color="secondary" />}
      {data && Array.isArray(data) && data.length > 0 && (
        <PageScreen content={data[0].content} />
      )}
    </Grid>
  )
}

PageList.defaultProps = {
  pageParams: null,
}

PageList.propTypes = {
  pageParams: PropTypes.shape({
    queryKey: PropTypes.arrayOf(PropTypes.string),
    queryParams: PropTypes.string,
  }),
  setPage: PropTypes.func.isRequired,
}

export default PageList
