import React from 'react'
import PropTypes from 'prop-types'
import ReactHtmlParser from 'react-html-parser'
import moment from 'moment'
import { styled } from '@material-ui/styles'
import { List, ListItem, Grid, ListSubheader } from '@material-ui/core'
import { apiFetchMails } from '../../../../../../utils/api'
import useFetch from '../../../../../hooks/useFetch'
import AlertMessage from '../../../../../elements/AlertMessage'
import FetchCircularProgress from '../../../../../elements/FetchCircularProgress'

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
const Mail = ({ createdAt, title, content, datetosend, isSent }) => (
  <StyledMailGrid container>
    <Grid item container xs={5} className="smalltext">
      créé le {moment(createdAt).format('DD MMMM YYYY')}
    </Grid>
    <Grid item container xs={5} className="smalltext">
      A envoyer le {moment(Number(datetosend)).format('DD MMMM YYYY')}
    </Grid>
    <Grid item container xs={2} className="smalltext">
      {isSent ? 'envoyé' : 'non envoyé'}
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

Mail.propTypes = {
  createdAt: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  datetosend: PropTypes.string.isRequired,
  isSent: PropTypes.bool.isRequired,
}

function ManageMailList() {
  const queryKey = ['mail-list']
  const queryParams = ''
  const {
    isLoading,
    isError,
    data: mails,
    errorMessage,
  } = useFetch(queryKey, queryParams, apiFetchMails)

  return (
    <Grid container>
      {isError && <AlertMessage severity="error" message={errorMessage} />}
      {isLoading && <FetchCircularProgress color="primary" />}
      {mails && (
        <List
          component="div"
          aria-labelledby="liste des messages envoyés"
          subheader={
            <ListSubheader component="div" id="titre liste des messages">
              Liste des messages envoyés
            </ListSubheader>
          }
        >
          {mails.map((mail) => (
            <ListItem key={mail.id}>
              <Mail {...mail} />
            </ListItem>
          ))}
        </List>
      )}
    </Grid>
  )
}

export default ManageMailList
