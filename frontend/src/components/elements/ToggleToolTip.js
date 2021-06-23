import React from 'react'
import CancelIcon from '@material-ui/icons/Cancel'
import EditIcon from '@material-ui/icons/Edit'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import PropTypes from 'prop-types'
import { Fab, styled, useTheme, Tooltip } from '@material-ui/core'

const StyledFab = styled(Fab)(({ theme, bgcolor }) => ({
  position: 'fixed',
  bottom: theme.spacing(2),
  right: theme.spacing(3),
  background: bgcolor,
}))

function ToggleToolTip({
  init,
  staticText,
  activeText,
  callback,
  action,
  toggleValue,
}) {
  const theme = useTheme()
  const icon = action === 'add' ? <AddCircleIcon /> : <EditIcon />

  return (
    <Tooltip
      title={init ? staticText : activeText}
      placement="bottom-end"
      aria-label={init ? staticText : activeText}
    >
      <StyledFab
        bgcolor={init ? theme.palette.success.main : theme.palette.error.main}
        onClick={() => callback(!toggleValue)}
      >
        {init ? icon : <CancelIcon />}
      </StyledFab>
    </Tooltip>
  )
}

ToggleToolTip.propTypes = {
  init: PropTypes.bool.isRequired,
  toggleValue: PropTypes.bool.isRequired,
  staticText: PropTypes.string.isRequired,
  activeText: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
}

export default ToggleToolTip
