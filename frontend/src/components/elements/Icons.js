import React from 'react'
import PropTypes from 'prop-types'

import SchoolIcon from '@material-ui/icons/School'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun'
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom'
import EcoSharpIcon from '@material-ui/icons/EcoSharp'
import MenuBookSharpIcon from '@material-ui/icons/MenuBookSharp'

function Icons({ alias }) {
  switch (alias) {
    case 'ecole':
      return <SchoolIcon />

    case 'viescolaire':
      return <DirectionsRunIcon />

    case 'classes':
      return <MeetingRoomIcon />

    case 'informations':
      return <MenuBookSharpIcon />

    case 'apelogec':
      return <EcoSharpIcon />

    case 'login':
    case 'register':
    case 'private':
      return <AccountCircleIcon />

    default:
      return null
  }
}

Icons.propTypes = {
  alias: PropTypes.string.isRequired,
}

export default Icons
