import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useQuery } from 'react-query'
import { Grid } from '@material-ui/core'
import ReactHtmlParser from 'react-html-parser'
import { apiFecthPage } from '../../utils/api'

import PageForms from './PageForms'
import ApiAlert from '../elements/ApiAlert'
import ToggleToolTip from '../elements/ToggleToolTip'
import AlertCollapse from '../elements/AlertCollapse'

function Page({ pageParams }) {
  const [showPageForm, setShowPageForm] = useState(false)
  const [showData, setShowData] = useState(false)
  const [showEditToolTip, setShowEditToolTip] = useState(true)
  const [topAlert, setTopAlert] = useState({
    severity: '',
    alertText: '',
    openAlert: false,
  })
  const { queryKey, queryParams, isAllowedToChange } = pageParams

  const { isLoading, isError, data, error } = useQuery(queryKey, () =>
    apiFecthPage(queryParams)
  )

  useEffect(() => {
    if (isLoading) {
      setTopAlert({
        severity: 'warning',
        alertText: 'Chargement de la page....',
        openAlert: true,
      })
    }
    if (isError) {
      setTopAlert({
        severity: 'error',
        alertText: error.response.data.message,
        openAlert: true,
      })
    }
    if (data && !Array.isArray(data)) {
      setShowData(false)
    } else {
      setShowData(true)
    }
    return () => {
      setTopAlert({
        severity: 'error',
        alertText: '',
        openAlert: false,
      })
    }
  }, [isLoading, isError, data])

  if (!Array.isArray(data)) {
    return null
  }
  const [page] = data
  const { text } = page
  return (
    <Grid container>
      <Grid item container>
        <AlertCollapse
          alertText={topAlert.alertText}
          openAlert={topAlert.openAlert}
          severity={topAlert.severity}
        />
      </Grid>
      {showData && (
        <Grid item container>
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
            <ToggleToolTip
              init={showEditToolTip}
              staticText="Editer la page"
              activeText="Annuler"
              action="edit"
              callback={setShowPageForm}
              toggleValue={showPageForm}
            />
          )}
        </Grid>
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
