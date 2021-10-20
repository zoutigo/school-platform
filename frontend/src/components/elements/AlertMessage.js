import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CloseIcon from '@material-ui/icons/Close'
import { Alert } from '@material-ui/lab'
import PropTypes from 'prop-types'
import { Collapse, IconButton } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}))

function AlertMessage({ message, severity }) {
  const [open, setOpen] = useState(true)
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Collapse in={open}>
        <Alert
          severity={severity}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => setOpen(false)}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {message}
        </Alert>
      </Collapse>
    </div>
  )
}

AlertMessage.propTypes = {
  message: PropTypes.string.isRequired,
  severity: PropTypes.string.isRequired,
}

export default AlertMessage
