import React from 'react'
import PropTypes from 'prop-types'
import { List, ListItem, Grid, ListSubheader } from '@material-ui/core'
import { apiFetchMails } from '../../../../../../utils/api'
import useFetch from '../../../../../hooks/useFetch'
import AlertMessage from '../../../../../elements/AlertMessage'
import FetchCircularProgress from '../../../../../elements/FetchCircularProgress'
import Mail from './Mail'

function ManageMailList({
  queryKey,
  queryParams,
  setFormAction,
  setShowForm,
  setCurrentMail,
  showForm,
}) {
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
      {mails && Array.isArray(mails) && (
        <List
          style={{ width: '100%' }}
          component="div"
          aria-labelledby="liste des messages envoyés"
          subheader={
            <ListSubheader component="div" id="titre liste des messages">
              Liste des messages envoyés
            </ListSubheader>
          }
        >
          {mails &&
            Array.isArray(mails) &&
            mails.map((mail) => (
              <ListItem key={mail.id}>
                <Mail
                  queryKey={queryKey}
                  setShowForm={setShowForm}
                  setFormAction={setFormAction}
                  setCurrentMail={setCurrentMail}
                  mail={mail}
                  showForm={showForm}
                />
              </ListItem>
            ))}
        </List>
      )}
    </Grid>
  )
}

ManageMailList.propTypes = {
  queryKey: PropTypes.arrayOf(PropTypes.string).isRequired,
  queryParams: PropTypes.string.isRequired,
  setFormAction: PropTypes.func.isRequired,
  setShowForm: PropTypes.func.isRequired,
  showForm: PropTypes.bool.isRequired,
  setCurrentMail: PropTypes.func.isRequired,
}

export default ManageMailList
