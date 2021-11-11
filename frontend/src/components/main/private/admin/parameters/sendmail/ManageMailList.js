import React from 'react'
import PropTypes from 'prop-types'
import { List, ListItem, Grid, ListSubheader } from '@material-ui/core'

const mails = [
  {
    id: 1,
    title: 'un essai',
    createdAt: '15/02/2020',
    content: 'Je suis content de vous retouber',
  },
  {
    id: 2,
    title: 'une modification',
    createdAt: '20/02/2021',
    content: 'Ne vous cachez pas trop',
  },
  {
    id: 3,
    title: 'une amélioration',
    createdAt: '18/02/2021',
    content: 'Une autre va arriver',
  },
]

const Mail = ({ createdAt, title, content }) => (
  <Grid container>
    <Grid item container xs={3}>
      {' '}
      {createdAt}
    </Grid>
    <Grid item container xs={9}>
      {' '}
      {title}
    </Grid>
    <Grid item container xs={12}>
      {' '}
      {content}
    </Grid>
  </Grid>
)

Mail.propTypes = {
  createdAt: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
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
