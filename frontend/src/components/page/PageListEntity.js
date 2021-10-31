import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Grid } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'
import { apiFecthEntity } from '../../utils/api'
import PageScreen from '../elements/reactpage/PageScreen'
import AlertMessage from '../elements/AlertMessage'
import useFetch from '../hooks/useFetch'

function PageListEntity({ pageParams, setEntity }) {
  const { isLoading, isError, data, errorMessage } = useFetch(
    pageParams.queryKey,
    pageParams.queryParams,
    apiFecthEntity
  )

  useEffect(() => {
    if (data) {
      if (Array.isArray(data)) {
        const [result] = data
        setEntity(result)
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

PageListEntity.defaultProps = {
  pageParams: null,
}

PageListEntity.propTypes = {
  pageParams: PropTypes.shape({
    queryKey: PropTypes.arrayOf(PropTypes.string),
    queryParams: PropTypes.string,
    type: PropTypes.string,
  }),
  setEntity: PropTypes.func.isRequired,
}

export default PageListEntity
