import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Alert from '@material-ui/lab/Alert'
import PropTypes from 'prop-types'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}))

function ApiAlert(props) {
  const { severity, children, action } = props
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Alert severity={severity} action={action}>
        {children}
      </Alert>
    </div>
  )
}
ApiAlert.defaultProps = {
  severity: 'info',
  children: null,
  action: null,
}
ApiAlert.propTypes = {
  severity: PropTypes.string,
  children: PropTypes.string,
  action: PropTypes.element,
}

export default ApiAlert
