import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useQuery } from 'react-query'
import { Grid } from '@material-ui/core'
import ReactHtmlParser from 'react-html-parser'
import { apiFecthPage } from '../../utils/api'
import ToolTipEditPage from '../elements/ToolTipEditPage'
import PageForms from './PageForms'
import ApiAlert from '../elements/ApiAlert'

function Page({ pageParams }) {
  const [showPageForm, setShowPageForm] = useState(false)
  const [showEditToolTip, setShowEditToolTip] = useState(true)
  const { queryKey, queryParams, isAllowedToChange } = pageParams

  console.log('isAllowed:', isAllowedToChange)

  const { isLoading, isError, data, error } = useQuery(queryKey, () =>
    apiFecthPage(queryParams)
  )

  if (isLoading) return <ApiAlert severity="warning">Chargement ...</ApiAlert>
  if (isError) return <ApiAlert severity="error">{error.message}</ApiAlert>

  if (!Array.isArray(data)) {
    return null
  }
  const [page] = data
  const { text } = page
  return (
    <Grid container>
      {!showPageForm ? (
        <Grid item container>
          {ReactHtmlParser(text) ||
            "il n'y a pas plus de détails pour le moment"}
        </Grid>
      ) : (
        <PageForms
          page={page}
          setShowPageForm={setShowPageForm}
          setShowEditToolTip={setShowEditToolTip}
          pageParams={pageParams}
        />
      )}
      {isAllowedToChange && (
        <ToolTipEditPage show={showEditToolTip} callback={setShowPageForm} />
      )}
    </Grid>
  )
}

Page.propTypes = {
  pageParams: PropTypes.exact({
    alias: PropTypes.string.isRequired,
    pageName: PropTypes.string.isRequired,
    queryKey: PropTypes.arrayOf(PropTypes.string).isRequired,
    queryParams: PropTypes.string.isRequired,
    setTopAlert: PropTypes.func.isRequired,
    isAllowedToChange: PropTypes.bool.isRequired,
  }).isRequired,
}

export default Page
