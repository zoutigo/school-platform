import { Collapse, IconButton, styled } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import CloseIcon from '@material-ui/icons/Close'
import ApiAlert from './ApiAlert'

const StyledSection = styled('section')(() => ({
  width: '100%',
}))

function AlertCollapse({ openAlert, alertText }) {
  const [open, setOpen] = useState(false)
  const [text, setText] = useState('')

  useEffect(() => {
    setOpen(openAlert)
    setText(alertText)
    return () => {
      setOpen(false)
      setText('')
    }
  }, [openAlert, alertText])
  return (
    <StyledSection>
      <Collapse in={open}>
        <ApiAlert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false)
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {text}
        </ApiAlert>
      </Collapse>
    </StyledSection>
  )
}

AlertCollapse.propTypes = {
  openAlert: PropTypes.bool.isRequired,
  alertText: PropTypes.string.isRequired,
}

export default AlertCollapse
