import React from 'react'
import PropTypes from 'prop-types'
import { Fab, styled, useTheme, Tooltip } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import BackspaceIcon from '@material-ui/icons/Backspace'

const StyledFab = styled(Fab)(({ theme, bgcolor }) => ({
  position: 'fixed',
  bottom: theme.spacing(2),
  right: theme.spacing(3),
  background: bgcolor,
}))

function ToolTipEditPage({ show, callback }) {
  const theme = useTheme()
  return (
    <Tooltip
      title={show ? 'Modifier la page' : 'Revenir sur la page'}
      placement="bottom-end"
      aria-label={show ? 'Modifier la page' : 'Revenir sur la page'}
    >
      <StyledFab
        bgcolor={show ? theme.palette.success.main : theme.palette.error.main}
        onClick={() => (show ? callback(true) : callback(false))}
      >
        {show ? <EditIcon /> : <BackspaceIcon />}
      </StyledFab>
    </Tooltip>
  )
}

ToolTipEditPage.propTypes = {
  show: PropTypes.bool.isRequired,
  callback: PropTypes.func.isRequired,
}

export default ToolTipEditPage
