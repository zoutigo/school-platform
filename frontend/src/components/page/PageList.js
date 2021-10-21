import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Grid } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'
import { apiFecthPage } from '../../utils/api'

import PageScreen from '../elements/reactpage/PageScreen'
import AlertMessage from '../elements/AlertMessage'
import useFetch from '../hooks/useFetch'

function PageList({ queryKey, queryParams, setPage }) {
  const { isLoading, isError, data, errorMessage } = useFetch(
    queryKey,
    queryParams,
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

  if (!data || !Array.isArray(data)) {
    return null
  }

  const [page] = data
  const { content } = page

  return (
    <Grid item container className="react-editor-read">
      {isError && <AlertMessage severity="error" message={errorMessage} />}
      {isLoading && <CircularProgress color="secondary" />}
      {data && Array.isArray(data) && <PageScreen content={content} />}
    </Grid>
  )
}

PageList.propTypes = {
  queryKey: PropTypes.arrayOf(PropTypes.string).isRequired,
  queryParams: PropTypes.string.isRequired,
  setPage: PropTypes.func.isRequired,
}

export default PageList
