/* eslint-disable arrow-body-style */
/* eslint-disable import/named */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Grid } from '@material-ui/core'
import ToggleToolTip from '../elements/ToggleToolTip'
import PageList from './PageList'
import PageListEntity from './PageListEntity'
import PageFormEntity from './PageFormEntity'
import PageForm from './PageForm'

function Page({ pageParams }) {
  const [page, setPage] = useState('')
  const [entity, setEntity] = useState('')
  const [showEditToolTip, setShowEditToolTip] = useState(true)

  if (!pageParams) return null
  const { isAllowedToChange, initialFormState } = pageParams
  const [showPageForm, setShowPageForm] = useState(initialFormState)
  return (
    <Grid container data-testid="page">
      <Grid item container>
        {!showPageForm && pageParams.type === 'entity' && (
          <PageListEntity pageParams={pageParams} setEntity={setEntity} />
        )}
        {!showPageForm && pageParams.type === 'page' && (
          <PageList pageParams={pageParams} setPage={setPage} />
        )}
        {isAllowedToChange && showPageForm && pageParams.type === 'entity' && (
          <PageFormEntity
            entity={entity}
            setShowPageForm={setShowPageForm}
            setShowEditToolTip={setShowEditToolTip}
            pageParams={pageParams}
          />
        )}
        {isAllowedToChange && showPageForm && pageParams.type === 'page' && (
          <PageForm
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

Page.defaultProps = {
  pageParams: {
    alias: 'fake',
    pageName: 'fake',
    queryKey: ['fake'],
    queryParams: 'fake',
    isAllowedToChange: false,
    type: 'page',
    initialFormState: false,
  },
}

Page.propTypes = {
  pageParams: PropTypes.shape({
    alias: PropTypes.string.isRequired,
    pageName: PropTypes.string.isRequired,
    queryKey: PropTypes.arrayOf(PropTypes.string).isRequired,
    queryParams: PropTypes.string.isRequired,
    isAllowedToChange: PropTypes.bool.isRequired,
    type: PropTypes.string.isRequired,
    initialFormState: PropTypes.bool.isRequired,
  }),
}

export default React.memo(Page)
