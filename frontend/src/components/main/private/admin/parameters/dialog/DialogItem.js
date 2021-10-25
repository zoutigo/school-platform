/* eslint-disable import/named */
import React, { useState } from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import { Collapse, Grid, styled } from '@material-ui/core'
import ReactHtmlParser from 'react-html-parser'
import EditIcon from '@material-ui/icons/Edit'
import Fab from '@material-ui/core/Fab'
import DeleteIcon from '@material-ui/icons/Delete'
import VisibilityIcon from '@material-ui/icons/Visibility'
import Tooltip from '@material-ui/core/Tooltip'
import { useSelector } from 'react-redux'
import { useSnackbar } from 'notistack'
import { apiPostDialog } from '../../../../../../utils/api'

import ManageDialogForm from './ManageDialogForm'
import ConfirmationDialog from '../../../../../elements/ConfirmationDialog'
import useMutate from '../../../../../hooks/useMutate'
import MutateCircularProgress from '../../../../../elements/MutateCircularProgress'
import getError from '../../../../../../utils/getError'
import getResponse from '../../../../../../utils/getResponse'

const StyledDeleteFab = styled(Fab)(({ theme }) => ({
  margin: theme.spacing(1),
  color: theme.palette.error.main,
}))
const StyledEditFab = styled(Fab)(({ theme }) => ({
  margin: theme.spacing(1),
  background: theme.palette.secondary.light,
  color: 'white',
}))
const StyledViewFab = styled(Fab)(({ theme }) => ({
  margin: theme.spacing(1),
  background: theme.palette.info.light,
  color: 'white',
}))

function DialogItem({ dialog, queryKey }) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const { text, title, startdate, enddate, id: dialogId } = dialog
  const [showText, setShowText] = useState(false)
  const [showUpdateForm, setShowUpdateForm] = useState(false)
  const [openConfirmDeleteDialog, setOpenConfirmDeleteDialog] = useState(false)

  const { Token } = useSelector((state) => state.user)
  useSelector((state) => state.settings)

  const { mutateAsync, isMutating } = useMutate(queryKey, apiPostDialog)

  const mutateDialog = async () => {
    const options = {
      headers: { 'x-access-token': Token },
    }
    closeSnackbar()
    try {
      await mutateAsync({
        id: dialogId,
        action: 'delete',
        options: options,
      }).then((response) => {
        enqueueSnackbar(getResponse(response), { variant: 'success' })
        setShowUpdateForm(false)

        window.scrollTo(0, 0)
      })
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: 'error' })
      // dispatch(setParametersMutateAlert(errorAlertCollapse(err.message)))
      window.scrollTo(0, 0)
    }
  }

  const ConfirmDeleteDialogContent = () => (
    <div>Souhaitez vous vraiment supprimer cette modale ?</div>
  )

  return (
    <Grid container alignItems="center">
      {isMutating && <MutateCircularProgress />}
      <ConfirmationDialog
        open={openConfirmDeleteDialog}
        title="Confirmation de suppression."
        content={<ConfirmDeleteDialogContent />}
        callback={mutateDialog}
        rollback={() => setOpenConfirmDeleteDialog(false)}
      />
      <Grid item xs={9}>
        <Grid item container justify="space-between">
          <Grid item xs={6}>
            {title}
          </Grid>
          <Grid item>
            Début: {moment(Number(startdate)).format('lll')} - Fin:{' '}
            {moment(Number(enddate)).format('lll')}
          </Grid>
        </Grid>
        <Collapse in={showText}>
          <Grid item container>
            {ReactHtmlParser(text)}{' '}
          </Grid>
        </Collapse>
      </Grid>
      <Grid item container xs={3} justify="flex-end">
        <Tooltip
          title="View"
          aria-label="view"
          onClick={() => setShowText(!showText)}
        >
          <StyledViewFab size="small">
            <VisibilityIcon />
          </StyledViewFab>
        </Tooltip>
        <Tooltip
          title="Edit"
          aria-label="Edit"
          onClick={() => setShowUpdateForm(!showUpdateForm)}
        >
          <StyledEditFab size="small">
            <EditIcon />
          </StyledEditFab>
        </Tooltip>
        <Tooltip
          title="Delete"
          aria-label="delete"
          onClick={() => setOpenConfirmDeleteDialog(true)}
        >
          <StyledDeleteFab size="small">
            <DeleteIcon />
          </StyledDeleteFab>
        </Tooltip>
      </Grid>
      <Collapse in={showUpdateForm}>
        <ManageDialogForm
          currentModal={dialog}
          queryKey={queryKey}
          formAction="update"
          setShowUpdateForm={setShowUpdateForm}
        />
      </Collapse>
    </Grid>
  )
}

DialogItem.defaultProps = null

DialogItem.propTypes = {
  queryKey: PropTypes.arrayOf(PropTypes.string).isRequired,
  dialog: PropTypes.shape({
    id: PropTypes.string,
    text: PropTypes.string,
    title: PropTypes.string,
    startdate: PropTypes.number.isRequired,
    enddate: PropTypes.number.isRequired,
  }),
}

export default DialogItem
