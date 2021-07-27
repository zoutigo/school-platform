import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core'

function ConfirmationDialog({ open, title, content, callback, rollback }) {
  return (
    <Dialog maxWidth="xs" open={open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent dividers>{content}</DialogContent>
      <DialogActions>
        <Button autoFocus onClick={() => rollback()} color="primary">
          Annuler
        </Button>
        <Button onClick={() => callback()} color="secondary">
          Confirmer
        </Button>
      </DialogActions>
    </Dialog>
  )
}

ConfirmationDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
  rollback: PropTypes.func.isRequired,
  content: PropTypes.func.isRequired,
}

export default ConfirmationDialog
