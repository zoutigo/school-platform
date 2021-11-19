import React from 'react'
import ReactHtmlParser from 'react-html-parser'
import { Button } from '@material-ui/core'
import { styled } from '@material-ui/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { useDispatch, useSelector } from 'react-redux'
import { setMainDialogCount } from '../../redux/settings/SettingsActions'

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  textTransform: 'uppercase',
  background: theme.palette.primary.main,
  fontWeight: 'bold',
  textAlign: 'center',
}))
const StyledDialogContentText = styled(DialogContentText)(({ theme }) => ({
  color: theme.palette.secondary.main,
}))

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
      <StyledDialogTitle id="alert-dialog-slide-title">
        {MainDialogDatas ? MainDialogDatas.title : null}
      </StyledDialogTitle>
      <DialogContent dividers>
        <StyledDialogContentText id="alert-dialog-slide-description">
          {ReactHtmlParser(MainDialogDatas ? MainDialogDatas.text : null)}
        </StyledDialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          color="secondary"
          variant="contained"
          fullWidth
        >
          Fermer
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default MainDialog
