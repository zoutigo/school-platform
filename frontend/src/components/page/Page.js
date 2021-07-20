/* eslint-disable arrow-body-style */
/* eslint-disable import/named */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { Grid } from '@material-ui/core'

import PageForms from './PageForms'
import ToggleToolTip from '../elements/ToggleToolTip'
import AlertCollapse from '../elements/AlertCollapse'
import {
  setPageFetchAlert,
  setPageMutateAlert,
} from '../../redux/alerts/AlertsActions'
import { initialAlertCollapse } from '../../constants/alerts'
import PageList from './PageList'

function Page({ pageParams }) {
  const dispatch = useDispatch()
  const [showPageForm, setShowPageForm] = useState(false)
  const [page, setPage] = useState('')
  const { pageFetch, pageMutate } = useSelector((state) => state.alerts)

  const [showEditToolTip, setShowEditToolTip] = useState(true)

  const { queryKey, queryParams, isAllowedToChange } = pageParams

  useEffect(() => {
    return () => {
      dispatch(setPageFetchAlert(initialAlertCollapse))
      dispatch(setPageMutateAlert(initialAlertCollapse))
    }
  }, [])

  return (
    <Grid container>
      <Grid item container>
        <AlertCollapse
          {...pageFetch}
          callback={() => dispatch(setPageFetchAlert(initialAlertCollapse))}
        />
        <AlertCollapse
          {...pageMutate}
          callback={() => dispatch(setPageMutateAlert(initialAlertCollapse))}
        />
      </Grid>
      <Grid item container>
        {!showPageForm && (
          <PageList
            queryKey={queryKey}
            queryParams={queryParams}
            setPage={setPage}
          />
        )}
        {showPageForm && (
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
    </Grid>
  )
}

Page.propTypes = {
  pageParams: PropTypes.exact({
    alias: PropTypes.string.isRequired,
    pageName: PropTypes.string.isRequired,
    queryKey: PropTypes.arrayOf(PropTypes.string).isRequired,
    queryParams: PropTypes.string.isRequired,
    isAllowedToChange: PropTypes.bool.isRequired,
  }).isRequired,
}

export default Page
