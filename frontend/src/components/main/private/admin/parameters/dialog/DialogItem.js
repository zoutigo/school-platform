/* eslint-disable import/named */
import React, { useState } from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import { Collapse, Grid, styled } from '@material-ui/core'
import ReactHtmlParser from 'react-html-parser'
import { useMutation } from 'react-query'
import EditIcon from '@material-ui/icons/Edit'
import Fab from '@material-ui/core/Fab'
import DeleteIcon from '@material-ui/icons/Delete'
import VisibilityIcon from '@material-ui/icons/Visibility'
import Tooltip from '@material-ui/core/Tooltip'
import { useDispatch, useSelector } from 'react-redux'
import { apiPostDialog } from '../../../../../../utils/api'
import { useUpdateMutationOptions } from '../../../../../../utils/hooks'
import { setParametersMutateAlert } from '../../../../../../redux/alerts/AlertsActions'
import {
  errorAlertCollapse,
  successAlertCollapse,
} from '../../../../../../constants/alerts'
import ManageDialogForm from './ManageDialogForm'
import ConfirmationDialog from '../../../../../elements/ConfirmationDialog'

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
const StyledGrid = styled(Grid)(({ theme }) => ({
  margin: theme.spacing(1),
  background: 'whitesmoke',
}))

function DialogItem({ dialog, queryKey }) {
  const { text, title, startdate, enddate, _id: dialogId } = dialog
  const [showText, setShowText] = useState(false)
  const [showUpdateForm, setShowUpdateForm] = useState(false)
  const [openConfirmDeleteDialog, setOpenConfirmDeleteDialog] = useState(false)
  const dispatch = useDispatch()

  const { Token } = useSelector((state) => state.user)
  useSelector((state) => state.settings)

  const { mutateAsync } = useMutation(
    apiPostDialog,
    useUpdateMutationOptions(queryKey)
  )

  const mutateDialog = async () => {
    const options = {
      headers: { 'x-access-token': Token },
    }
    try {
      await mutateAsync({
        id: dialogId,
        action: 'delete',
        options: options,
      }).then((response) => {
        setShowUpdateForm(false)
        dispatch(
          setParametersMutateAlert(successAlertCollapse(response.message))
        )
        window.scrollTo(0, 0)
      })
    } catch (err) {
      dispatch(setParametersMutateAlert(errorAlertCollapse(err.message)))
      window.scrollTo(0, 0)
    }
  }

  const ConfirmDeleteDialogContent = () => (
    <div>Souhaitez vous vraiment supprimer cette modale ?</div>
  )
  return (
    <Grid container alignItems="center">
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
            Début: {moment(startdate).format('lll')} - Fin:{' '}
            {moment(enddate).format('lll')}
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
    _id: PropTypes.string,
    text: PropTypes.string,
    title: PropTypes.string,
    startdate: PropTypes.number.isRequired,
    enddate: PropTypes.number.isRequired,
  }),
}

export default DialogItem
