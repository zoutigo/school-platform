import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
} from '@material-ui/core'

function ConfirmationDialog({
  open,
  title,
  contentTitle,
  contentQuestion,
  content,
  callback,
  rollback,
}) {
  return (
    <Dialog maxWidth="xs" open={open}>
      <DialogTitle style={{ textTransform: 'uppercase' }}>{title}</DialogTitle>
      <DialogContent dividers>
        <DialogContentText>{contentTitle}</DialogContentText>
        <DialogContentText>{contentQuestion}</DialogContentText>

        {content}
      </DialogContent>
      <DialogActions
        style={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <Button
          autoFocus
          onClick={() => rollback()}
          color="primary"
          variant="contained"
        >
          Annuler
        </Button>
        <Button
          onClick={() => callback()}
          color="secondary"
          variant="contained"
        >
          Confirmer
        </Button>
      </DialogActions>
    </Dialog>
  )
}

ConfirmationDialog.defaultProps = {
  open: false,
}

ConfirmationDialog.propTypes = {
  open: PropTypes.bool,
  title: PropTypes.string.isRequired,
  contentTitle: PropTypes.string.isRequired,
  contentQuestion: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
  rollback: PropTypes.func.isRequired,
  content: PropTypes.func.isRequired,
}

export default ConfirmationDialog
