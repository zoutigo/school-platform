import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { Fab, Grid, styled, Tooltip } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import AlertCollapse from '../elements/AlertCollapse'
import PaperNativeList from './PaperNativeList'
import PaperSearchList from './PaperSearchList'
import PaperForm from './PaperForm'
import {
  setPaperFetchAlert,
  setPaperMutateAlert,
} from '../../redux/alerts/AlertsActions'
import { initialAlertCollapse } from '../../constants/alerts'

const StyledFab = styled(Fab)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(2),
  right: theme.spacing(3),
  background: theme.palette.success.main,
}))

function Paper({ paper }) {
  const dispatch = useDispatch()
  const { isAllowedToChange } = paper
  const [showPaperForm, setShowPaperForm] = useState(false)
  const [showPaperList, setShowPaperList] = useState(true)
  const [showTooltip, setShowTooltip] = useState(true)
  const [showSearch, setShowSearch] = useState(false)
  const [currentDocument, setCurrentDocument] = useState(null)
  const [formAction, setFormAction] = useState(null)
  const [topAlert, setTopAlert] = useState({
    severity: '',
    alertText: '',
    openAlert: false,
  })

  const { paperMutate, paperFetch } = useSelector((state) => state.alerts)

  // eslint-disable-next-line arrow-body-style
  useEffect(() => {
    return () => {
      dispatch(setPaperMutateAlert(initialAlertCollapse))
      dispatch(setPaperFetchAlert(initialAlertCollapse))
    }
  }, [])

  return (
    <Grid container>
      <AlertCollapse
        {...paperMutate}
        callback={() => dispatch(setPaperMutateAlert(initialAlertCollapse))}
      />
      <AlertCollapse
        {...paperFetch}
        callback={() => dispatch(setPaperFetchAlert(initialAlertCollapse))}
      />
      {topAlert.openAlert && (
        <Grid item container>
          <AlertCollapse
            alertText={topAlert.alertText}
            openAlert
            severity={topAlert.severity}
            callback={setTopAlert}
          />
        </Grid>
      )}
      {showPaperList && showSearch && (
        <PaperSearchList
          setShowPaperForm={setShowPaperForm}
          setShowPaperList={setShowPaperList}
          paper={paper}
          setTopAlert={setTopAlert}
          setCurrentDocument={setCurrentDocument}
          currentDocument={currentDocument}
          setFormAction={setFormAction}
          setShowSearch={setShowSearch}
        />
      )}
      {showPaperList && !showSearch && (
        <PaperNativeList
          setShowPaperForm={setShowPaperForm}
          setShowPaperList={setShowPaperList}
          paper={paper}
          setTopAlert={setTopAlert}
          setCurrentDocument={setCurrentDocument}
          currentDocument={currentDocument}
          setFormAction={setFormAction}
          setShowSearch={setShowSearch}
        />
      )}

      {showPaperForm && isAllowedToChange && (
        <PaperForm
          setCurrentDocument={setCurrentDocument}
          currentDocument={currentDocument}
          setShowTooltip={setShowTooltip}
          setFormAction={setFormAction}
          formAction={formAction}
          setShowPaperList={setShowPaperList}
          setShowPaperForm={setShowPaperForm}
          paper={paper}
        />
      )}
      {showTooltip && isAllowedToChange && (
        <Tooltip
          title="Ajouter un ??v??nement"
          placement="bottom-end"
          aria-label="Ajouter un ??v??nement"
        >
          <StyledFab
            onClick={() => {
              setShowPaperForm(true)
              setShowPaperList(false)
              setCurrentDocument(null)
              setFormAction('create')
            }}
          >
            <AddIcon />
          </StyledFab>
        </Tooltip>
      )}
    </Grid>
  )
}

Paper.propTypes = {
  paper: PropTypes.shape({
    queryKey: PropTypes.arrayOf(PropTypes.string),
    queryParams: PropTypes.string,
    paperName: PropTypes.string.isRequired,
    paperFormat: PropTypes.string.isRequired,
    paperType: PropTypes.string.isRequired,
    entityAlias: PropTypes.string.isRequired,
    isAllowedToChange: PropTypes.bool.isRequired,
    fetcher: PropTypes.func.isRequired,
    poster: PropTypes.func.isRequired,
  }).isRequired,
}

export default Paper
