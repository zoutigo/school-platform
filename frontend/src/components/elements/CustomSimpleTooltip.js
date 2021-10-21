import { styled, Fab, Tooltip, useTheme } from '@material-ui/core'
import React from 'react'
import PropTypes from 'prop-types'
import EditIcon from '@material-ui/icons/Edit'
import AddIcon from '@material-ui/icons/Add'
import CancelIcon from '@material-ui/icons/Cancel'
import BackspaceIcon from '@material-ui/icons/Backspace'

const StyledFab = styled(Fab)(({ theme, bgcolor }) => ({
  position: 'fixed',
  bottom: theme.spacing(2),
  right: theme.spacing(3),
  background: bgcolor,
}))

function CustomSimpleTooltip({ callback, title, action }) {
  const theme = useTheme()
  const handleClick = () => {
    callback()
  }

  const costums = () => {
    switch (action) {
      case 'add':
        return {
          icon: <AddIcon />,
          color: theme.palette.primary.dark,
        }
      case 'edit':
        return {
          icon: <EditIcon />,
          color: theme.palette.secondary.main,
        }
      case 'cancel':
        return {
          icon: <CancelIcon />,
          color: theme.palette.warning.main,
        }
      case 'back':
        return {
          icon: <BackspaceIcon />,
          color: theme.palette.warning.main,
        }

      default:
        return null
    }
  }

  const { color, icon } = costums()

  return (
    <Tooltip title={title} placement="bottom-end" aria-label={action}>
      <StyledFab bgcolor={color} onClick={handleClick}>
        {icon}
      </StyledFab>
    </Tooltip>
  )
}

CustomSimpleTooltip.propTypes = {
  callback: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired,
}

export default CustomSimpleTooltip
