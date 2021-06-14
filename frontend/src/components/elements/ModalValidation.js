import {
  Box,
  Modal,
  Paper,
  styled,
  Typography,
  useTheme,
  Icon,
} from '@material-ui/core'
import PropTypes from 'prop-types'

import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import React from 'react'
import CustomButton from './CustomButton'
import { StyledIconBox } from './styled'

const StyledPaper = styled(Paper)(({ theme }) => ({
  boxSizing: 'border-box',
  overflow: 'hidden',
  padding: theme.spacing(2, 4, 3),
  width: '600px',
  background: 'whitesmoke',
  position: 'absolute',
  fontSize: '2rem',
  top: '50vh',
  left: '50vw',
  transform: 'translate(-50%, -50%)',
  '& >:first-child': {
    background: 'whitesmoke',
    paddingTop: '1rem',
    paddingBottom: '1rem',
  },
}))

const StyledModalHeader = styled(Box)(() => ({
  width: '100%',
  display: 'flex',
  '& >*': {
    marginLeft: '2rem',
  },
  justifyContent: 'flex-start',
  alignItems: 'center',
  '&:first-child': {},
}))
const StyledModalBody = styled(Box)(() => ({
  boxSizing: 'border-box',
  width: '100%',
  padding: '2rem 1rem',
  textAlign: 'left',
}))
const StyledModalFooter = styled(Box)(() => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-evenly',
}))

const StyledHeaderTypo = styled(Typography)(() => ({
  textTransform: 'uppercase',
  fontWeight: 'bold',
  letterSpacing: '1px',
}))

function ModalValidation({ open, setOpen, callback, modaltype }) {
  const theme = useTheme()

  const costum = (type) => {
    switch (type) {
      case 'delete':
        return {
          title: 'Suppression document',
          color: theme.palette.error.light,
          actionText: 'Je supprime',
          question:
            'Souhaitez  vous supprimer cet élément ? Cette opération est irreversible.',
        }

      case 'update':
        return {
          title: 'Modification document',
          color: theme.palette.info.main,
          actionText: 'Je mofifie',
          question: 'Souhaitez vous modifier ce document ?',
        }

      default:
        return {
          title: 'Demande de confirmation',
          color: theme.palette.primary.main,
          actionText: 'Je confirme',
          question: 'souhaitez vous continuer ?',
        }
    }
  }

  const { color: modalcolor, actionText, question, title } = costum(modaltype)
  const handleConfirm = () => {
    setOpen(false)
    callback()
  }
  return (
    <Modal
      aria-labelledby="confirmation modal"
      aria-describedby="confirmation modal"
      open={open}
      onClose={() => setOpen(false)}
      disablePortal
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <StyledPaper bgcolor={modalcolor}>
          <StyledModalHeader>
            <StyledIconBox
              bgcolor={
                modaltype === 'delete'
                  ? theme.palette.error.main
                  : theme.palette.warning.main
              }
              fontsize="3rem"
            >
              <Icon className="fa fa-exclamation-circle" />
            </StyledIconBox>

            <StyledHeaderTypo variant="body2">{title}</StyledHeaderTypo>
          </StyledModalHeader>
          <StyledModalBody>
            <Typography variant="body2">{question}</Typography>
          </StyledModalBody>
          <StyledModalFooter>
            <CustomButton
              text="Oups...."
              bgcolor={theme.palette.warning.light}
              action="cancel"
              onClick={() => setOpen(false)}
            />
            <CustomButton
              text={actionText}
              bgcolor={theme.palette.success.light}
              action="confirm"
              onClick={handleConfirm}
            />
          </StyledModalFooter>
        </StyledPaper>
      </Fade>
    </Modal>
  )
}

ModalValidation.defaultProps = null
ModalValidation.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  callback: PropTypes.func,
  modaltype: PropTypes.string,
}

export default ModalValidation
