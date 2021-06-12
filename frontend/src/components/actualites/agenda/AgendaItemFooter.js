import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useMutation } from 'react-query'
import { ButtonGroup, Tooltip, useTheme } from '@material-ui/core'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import UpdateIcon from '@material-ui/icons/Update'
import { useSelector } from 'react-redux'
import { StyledPaperFooter, StyledIconButton } from '../../elements/styled'
import { apiPostEvents } from '../../../utils/api'
import { useUpdateMutationOptions } from '../../../utils/hooks'
import AlertCollapse from '../../elements/AlertCollapse'
import ModalValidation from '../../elements/ModalValidation'

function AgendaItemFooter({
  event,
  setShowEventForm,
  setShowEventList,
  setCurrentEventId,
  queryKey,
  setTopAlert,
}) {
  const { _id: eventId } = event
  const theme = useTheme()
  const [open, setOpen] = React.useState(false)
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false)
  const [openUpdateModal, setOpenUpdateModal] = React.useState(false)
  const [openAlert, setOpenAlert] = React.useState(false)
  const [alertMessage, setAlertMessage] = React.useState('')

  const token = useSelector((state) => state.user.Token.token)
  useSelector((state) => state.settings)

  const { mutateAsync } = useMutation(
    apiPostEvents,
    useUpdateMutationOptions(queryKey)
  )

  const mutatePaper = async () => {
    const options = {
      headers: { 'x-access-token': token },
    }
    try {
      await mutateAsync({
        id: eventId,
        action: 'delete',
        options: options,
      })
    } catch (err) {
      setTopAlert({
        openAlert: true,
        severity: 'error',
        alertText: err.message,
      })
    }
  }

  const handleUpdate = () => {
    setCurrentEventId(eventId)
    setShowEventList(false)
    setShowEventForm(true)
  }

  return (
    <StyledPaperFooter item container>
      <AlertCollapse
        severiry="error"
        openalert={openAlert}
        alertText={alertMessage}
      />
      <ModalValidation
        modaltype="delete"
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        callback={mutatePaper}
      />
      <ModalValidation
        modaltype="update"
        open={openUpdateModal}
        setOpen={setOpenUpdateModal}
        callback={handleUpdate}
      />
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
  setShowEventList: PropTypes.func.isRequired,
  setShowEventForm: PropTypes.func.isRequired,
  setCurrentEventId: PropTypes.func.isRequired,
  setTopAlert: PropTypes.func.isRequired,

  queryKey: PropTypes.arrayOf(PropTypes.string).isRequired,
}
export default AgendaItemFooter
