import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { useQuery } from 'react-query'
import { Grid } from '@material-ui/core'
import ReactHtmlParser from 'react-html-parser'
import { apiFecthPage } from '../../utils/api'
import { setPageFetchAlert } from '../../redux/alerts/AlertsActions'
import {
  errorAlertCollapse,
  initialAlertCollapse,
  loadingAlertCollapse,
} from '../../constants/alerts'
import PageScreen from '../elements/reactpage/PageScreen'

function PageList({ queryKey, queryParams, setPage }) {
  const dispatch = useDispatch()
  const { isLoading, isError, data, error } = useQuery(queryKey, () =>
    apiFecthPage(queryParams)
  )

  useEffect(() => {
    if (isLoading) {
      dispatch(setPageFetchAlert(loadingAlertCollapse))
    }
    if (isError) {
      dispatch(
        setPageFetchAlert(errorAlertCollapse(error.response.data.message))
      )
    }
    if (data) {
      dispatch(setPageFetchAlert(initialAlertCollapse))
      if (Array.isArray(data)) {
        const [result] = data
        setPage(result)
      }
    }
  }, [isLoading, isError, data])

  if (!data || !Array.isArray(data)) {
    return null
  }

  const [page] = data
  const { content } = page

  return (
    <Grid item container className="react-editor-read">
      <PageScreen content={content} />
      {/* {ReactHtmlParser(text) || "il n'y a pas plus de détails pour le moment"} */}
    </Grid>
  )
}

PageList.propTypes = {
  queryKey: PropTypes.arrayOf(PropTypes.string).isRequired,
  queryParams: PropTypes.string.isRequired,
  setPage: PropTypes.func.isRequired,
}

export default PageList
