import React from 'react'
import PropTypes from 'prop-types'
import { List, ListItem, Grid, ListSubheader } from '@material-ui/core'

const mails = [
  {
    id: 1,
    title: 'un essai',
    createdAt: '15/02/2020',
    content: 'Je suis content de vous retouber',
    datetosend: '18/03/2020',
    isSent: true,
  },
  {
    id: 2,
    title: 'une modification',
    createdAt: '20/02/2021',
    content: 'Ne vous cachez pas trop',
    datetosend: '17/02/2021',
    isSent: true,
  },
  {
    id: 3,
    title: 'une amélioration',
    createdAt: '10/06/2021',
    content: 'Une autre va arriver',
    datetosend: '08/06/2021',
    isSent: false,
  },
]

const Mail = ({ createdAt, title, content, datetosend, isSent }) => (
  <Grid container>
    <Grid item container xs={2}>
      {createdAt}
    </Grid>
    <Grid item container xs={2}>
      {datetosend}
    </Grid>
    <Grid item container xs={2}>
      {isSent ? 'envoyé' : 'non envoyé'}
    </Grid>
    <Grid item container xs={6}>
      {' '}
      {title}
    </Grid>
    <Grid item container xs={12}>
      {' '}
      {content}
    </Grid>
    <Grid item xs={12}>
      <img src="/logo1000.png" alt="logo" />
    </Grid>
  </Grid>
)

Mail.propTypes = {
  createdAt: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  datetosend: PropTypes.string.isRequired,
  isSent: PropTypes.bool.isRequired,
}

function ManageMailList() {
  return (
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
  )
}

export default ManageMailList
