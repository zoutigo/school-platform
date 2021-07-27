import React from 'react'
import ReactHtmlParser from 'react-html-parser'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { useDispatch, useSelector } from 'react-redux'
import {
  setMainDialogCount,
  setMainDialogIsOpen,
} from '../../redux/settings/SettingsActions'

function MainDialog() {
  const { MainDialogDatas, MainDialogCount } = useSelector(
    (state) => state.settings
  )

  const dispatch = useDispatch()
  const handleClose = () => dispatch(setMainDialogCount(1))

  return (
    <Dialog
      open={MainDialogCount === 0}
      //   TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">
        {MainDialogDatas ? MainDialogDatas.title : null}
      </DialogTitle>
      <DialogContent dividers>
        <DialogContentText id="alert-dialog-slide-description">
          {ReactHtmlParser(MainDialogDatas ? MainDialogDatas.text : null)}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {/* <Button onClick={handleClose} color="primary">
          Disagree
        </Button> */}
        <Button onClick={handleClose} color="primary">
          Fermer
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default MainDialog
