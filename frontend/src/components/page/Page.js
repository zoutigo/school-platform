import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useQuery } from 'react-query'
import { Fab, Grid, styled, Tooltip, useTheme } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import BackspaceIcon from '@material-ui/icons/Backspace'
import ReactHtmlParser from 'react-html-parser'
import { apiFecthPage } from '../../utils/api'

import PageForms from './PageForms'
import { useRigths } from '../../utils/hooks'
import ApiAlert from '../elements/ApiAlert'

const StyledFab = styled(Fab)(({ theme, bgcolor }) => ({
  position: 'fixed',
  bottom: theme.spacing(2),
  right: theme.spacing(3),
  background: bgcolor,
}))

function Page({ pageParams }) {
  const theme = useTheme()
  const [showPageForm, setShowPageForm] = useState(false)
  const [showEditToolTip, setShowEditToolTip] = useState(true)
  const { queryKey, queryParams } = pageParams
  const { moderatorLevel } = useRigths()
  const isAllowedToChange = moderatorLevel

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
        <Tooltip
          title={showEditToolTip ? 'Modifier la page' : 'Revenir sur la page'}
          placement="bottom-end"
          aria-label={
            showEditToolTip ? 'Modifier la page' : 'Revenir sur la page'
          }
        >
          <StyledFab
            bgcolor={
              showEditToolTip
                ? theme.palette.success.main
                : theme.palette.error.main
            }
            onClick={() =>
              showEditToolTip ? setShowPageForm(true) : setShowPageForm(false)
            }
          >
            {showEditToolTip ? <EditIcon /> : <BackspaceIcon />}
          </StyledFab>
        </Tooltip>
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
  }).isRequired,
}

export default Page
