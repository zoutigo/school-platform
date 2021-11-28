import React, { useState } from 'react'
import PropTypes from 'prop-types'
import ReactHtmlParser from 'react-html-parser'
import moment from 'moment'
import { Grid, Tooltip, Fab } from '@material-ui/core'
import { useSnackbar } from 'notistack'
import { useSelector } from 'react-redux'

import { styled } from '@material-ui/styles'
import ReceiptIcon from '@material-ui/icons/Receipt'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import EditIcon from '@material-ui/icons/Edit'
import ConfirmationDialog from '../../../../../elements/ConfirmationDialog'
import useMutate from '../../../../../hooks/useMutate'
import { apiPostMails } from '../../../../../../utils/api'
import getResponse from '../../../../../../utils/getResponse'
import getError from '../../../../../../utils/getError'
import MutateCircularProgress from '../../../../../elements/MutateCircularProgress'

const StyledMailGrid = styled(Grid)(({ theme }) => ({
  background: theme.palette.primary.light,
  padding: '0.5rem',
  '& .mail-header': {
    '& .content': {
      fontSize: '1rem',
      background: 'whitesmoke',
      padding: '0.5rem 0px',
    },
  },
  '& .title': {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: '1.2rem',
    padding: '0.5rem 0px',
  },
  '& .smalltext': {
    fontSize: '0.9rem',
  },
  '& .content': {
    fontSize: '0.9rem',
  },
}))

const StyledDeleteFab = styled(Fab)(({ theme }) => ({
  margin: theme.spacing(1),
  color: theme.palette.secondary.main,
  background: 'white',
}))

const Mail = ({
  mail,
  setShowForm,
  showForm,
  setCurrentMail,
  setFormAction,
  queryKey,
}) => {
  const { createdAt, title, content, datetosend, isSent, id } = mail
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false)
  const { mutateAsync, isMutating } = useMutate(queryKey, apiPostMails)
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const { Token } = useSelector((state) => state.user)
  const options = {
    headers: { 'x-access-token': Token },
  }

  const handleClick = () => {
    setCurrentMail(mail)
    setFormAction('update')
    setShowForm(!showForm)
  }

  const handleDelete = () => {
    setOpenConfirmationModal(true)
  }

  const mutateMail = async () => {
    closeSnackbar()
    try {
      await mutateAsync({
        id: mail.id,
        action: 'delete',
        options: options,
        body: null,
      }).then((response) => {
        enqueueSnackbar(getResponse(response), { variant: 'success' })
        setCurrentMail(null)
        window.scrollTo(0, 0)
      })
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: 'error' })
      window.scrollTo(0, 0)
    }
  }

  return (
    <StyledMailGrid container>
      {isMutating && <MutateCircularProgress />}
      <ConfirmationDialog
        open={openConfirmationModal}
        title={`Suppression du mail `}
        contentTitle={title}
        contentQuestion="Souhaitez vous le supprimer ?"
        callback={mutateMail}
        rollback={() => setOpenConfirmationModal(false)}
      />
      <Grid item container className="mail-header" alignItems="center">
        <Grid item container xs={4} className="smalltext">
          créé le {moment(createdAt).format('DD MMMM YYYY')}
        </Grid>
        <Grid item container xs={4} className="smalltext">
          A envoyer le {moment(Number(datetosend)).format('DD MMMM YYYY')}
        </Grid>
        <Grid item container xs={2} className="smalltext">
          {isSent ? 'envoyé' : 'non envoyé'}
        </Grid>
        {!isSent && (
          <Grid item container xs={1} className="smalltext">
            <Tooltip
              title="Envoyer un mail"
              aria-label="Envoyer un mail"
              onClick={handleClick}
            >
              <StyledDeleteFab size="small">
                {showForm ? <ReceiptIcon /> : <EditIcon />}
              </StyledDeleteFab>
            </Tooltip>
          </Grid>
        )}

        {!isSent && (
          <Grid item container xs={1} className="smalltext">
            <Tooltip
              title="Supprimer un mail"
              aria-label="Supprimer un mail"
              onClick={handleDelete}
            >
              <StyledDeleteFab size="small">
                {showForm ? <ReceiptIcon /> : <DeleteForeverIcon />}
              </StyledDeleteFab>
            </Tooltip>
          </Grid>
        )}
      </Grid>

      <Grid item container className="title">
        {title}
      </Grid>
      <Grid item container className="content">
        {ReactHtmlParser(content)}
      </Grid>
    </StyledMailGrid>
  )
}

Mail.propTypes = {
  mail: PropTypes.shape({
    id: PropTypes.number.isRequired,
    createdAt: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    datetosend: PropTypes.string.isRequired,
    isSent: PropTypes.bool.isRequired,
  }).isRequired,
  setShowForm: PropTypes.func.isRequired,
  setCurrentMail: PropTypes.func.isRequired,
  setFormAction: PropTypes.func.isRequired,
  showForm: PropTypes.bool.isRequired,
  queryKey: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default Mail
