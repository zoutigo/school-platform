/* eslint-disable no-nested-ternary */
import React from 'react'
import PropTypes from 'prop-types'
import AddIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close'
import EditIcon from '@material-ui/icons/Edit'
import Fab from '@material-ui/core/Fab'

import Tooltip from '@material-ui/core/Tooltip'
import { styled, useTheme } from '@material-ui/core'

const StyledFab = styled(Fab)(({ maincolor }) => ({
  margin: '0.2rem',
  background: maincolor,
  color: 'white',
}))

function ToolTipPrivateDatas({ title, callback, action }) {
  const theme = useTheme()
  const color =
    action === 'add'
      ? theme.palette.primary.dark
      : action === 'edit'
      ? theme.palette.secondary.main
      : theme.palette.error.main

  const Icon = () => {
    switch (action) {
      case 'edit':
        return <EditIcon />

      case 'add':
        return <AddIcon />

      case 'cancel':
        return <CloseIcon />

      default:
        return <CloseIcon />
    }
  }

  return (
    <Tooltip title={title} aria-label={title}>
      <StyledFab onClick={() => callback()} maincolor={color}>
        <Icon />
      </StyledFab>
    </Tooltip>
  )
}

ToolTipPrivateDatas.propTypes = {
  title: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
}

export default ToolTipPrivateDatas
