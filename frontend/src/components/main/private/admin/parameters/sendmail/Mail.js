import React, { useState } from 'react'
import PropTypes from 'prop-types'
import ReactHtmlParser from 'react-html-parser'
import moment from 'moment'
import {
  List,
  ListItem,
  Grid,
  ListSubheader,
  Tooltip,
  Fab,
} from '@material-ui/core'

import { styled } from '@material-ui/styles'
import ReceiptIcon from '@material-ui/icons/Receipt'
import EditIcon from '@material-ui/icons/Edit'
import ManageMailForm from './ManageMailForm'

const StyledMailGrid = styled(Grid)(({ theme }) => ({
  background: theme.palette.primary.light,
  padding: '1rem 0.5rem',
  '& .title': {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: '1.2rem',
    padding: '0.5rem 0px',
  },
  '& .content': {
    fontSize: '1rem',
    background: 'whitesmoke',
    padding: '0.5rem 0px',
  },
  '& .smalltext': {
    fontSize: '0.9rem',
  },
}))

const StyledDeleteFab = styled(Fab)(({ theme }) => ({
  margin: theme.spacing(1),
  color: theme.palette.secondary.main,
  background: 'white',
}))

const Mail = ({ createdAt, title, content, datetosend, isSent }) => {
  const [showForm, setShowForm] = useState(false)

  const handleClick = () => {
    setShowForm(!showForm)
  }

  if (showForm) return <ManageMailForm />
  return (
    <StyledMailGrid container>
      <Grid item container xs={4} className="smalltext">
        créé le {moment(createdAt).format('DD MMMM YYYY')}
      </Grid>
      <Grid item container xs={4} className="smalltext">
        A envoyer le {moment(Number(datetosend)).format('DD MMMM YYYY')}
      </Grid>
      <Grid item container xs={2} className="smalltext">
        {isSent ? 'envoyé' : 'non envoyé'}
      </Grid>
      <Grid item container xs={2} className="smalltext">
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
      <Grid item container xs={12} className="title">
        {' '}
        {title}
      </Grid>
      <Grid item container xs={12} className="content">
        {ReactHtmlParser(content)}
      </Grid>
    </StyledMailGrid>
  )
}

Mail.propTypes = {
  createdAt: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  datetosend: PropTypes.string.isRequired,
  isSent: PropTypes.bool.isRequired,
}

export default Mail
