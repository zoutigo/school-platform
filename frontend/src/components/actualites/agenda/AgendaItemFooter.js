import React from 'react'
import PropTypes from 'prop-types'
import {
  ButtonGroup,
  Collapse,
  Grid,
  IconButton,
  styled,
  Tooltip,
  useTheme,
} from '@material-ui/core'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import UpdateIcon from '@material-ui/icons/Update'
import { StyledPaperFooter, StyledIconButton } from '../../elements/styled'

function AgendaItemFooter({ event, setShowEventForm }) {
  const theme = useTheme()
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false)
  const [openUpdateModal, setOpenUpdateModal] = React.useState(false)
  const [openAlert, setOpenAlert] = React.useState(false)
  return (
    <StyledPaperFooter item container>
      <ButtonGroup>
        <Tooltip title="Modifier" placement="bottom">
          <StyledIconButton
            color={theme.palette.warning.main}
            onClick={() => setOpenUpdateModal(true)}
          >
            <UpdateIcon style={{ fontSize: 'inherit', color: 'inherit' }} />
          </StyledIconButton>
        </Tooltip>
        <Tooltip title="Supprimer" placement="bottom">
          <StyledIconButton
            color={theme.palette.error.main}
            onClick={() => setOpenDeleteModal(true)}
          >
            <HighlightOffIcon
              style={{ fontSize: 'inherit', color: 'inherit' }}
            />
          </StyledIconButton>
        </Tooltip>
      </ButtonGroup>
    </StyledPaperFooter>
  )
}

AgendaItemFooter.propTypes = {
  event: PropTypes.shape({
    place: PropTypes.string,
    createdat: PropTypes.string,
    _id: PropTypes.string,
    title: PropTypes.string,
    text: PropTypes.string,
    author: PropTypes.string,
  }).isRequired,
  setShowEventForm: PropTypes.func.isRequired,
}
export default AgendaItemFooter
