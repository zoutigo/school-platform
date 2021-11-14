import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Grid, Collapse, Tooltip, Fab, styled } from '@material-ui/core'
import ReceiptIcon from '@material-ui/icons/Receipt'
import EditIcon from '@material-ui/icons/Edit'
import StyledParametresGrid from '../../../../../styled-components/StyledPrametresGrid'
import Title from '../../../../../elements/Title'
import ManageMailList from './ManageMailList'
import ManageMailForm from './ManageMailForm'

const StyledDeleteFab = styled(Fab)(({ theme }) => ({
  margin: theme.spacing(1),
  color: theme.palette.secondary.main,
  background: 'white',
}))

const rgpd = `Conformément à la réglementation relative à la protection des données personnelles, vous bénéficiez d'un droit d'accès, de rectification, d'effacement et de portabilité de vos informations personnelles. il suffit juste de les modifier dans votre espace personnel ou de contacter l'administrateur du site `

function ManageMail({ setShowParams }) {
  const [showForm, setShowForm] = useState(false)
  const [showParametresDetails, setShowParametresDetails] = useState(false)
  const queryKey = ['sent-email-list']
  const queryParams = ``

  return (
    <StyledParametresGrid item container>
      <Grid item container justifyContent="space-between">
        <Grid
          item
          xs={11}
          onClick={() => setShowParametresDetails(!showParametresDetails)}
          role="presentation"
          className="title"
        >
          <Title title="gestion des mails admin" />
        </Grid>

        {showParametresDetails && (
          <Grid item xs={1} style={{ textAlign: 'right' }}>
            <Tooltip
              title="Envoyer un mail"
              aria-label="Envoyer un mail"
              onClick={() => setShowForm(!showForm)}
            >
              <StyledDeleteFab size="small">
                {showForm ? <ReceiptIcon /> : <EditIcon />}
              </StyledDeleteFab>
            </Tooltip>
          </Grid>
        )}
      </Grid>
      <Collapse in={showParametresDetails} style={{ width: '100%' }}>
        {!showForm ? (
          <Grid item container>
            <ManageMailList
              setShowForm={setShowForm}
              queryKey={queryKey}
              queryParams={queryParams}
            />
          </Grid>
        ) : (
          <Grid item container>
            <ManageMailForm
              setShowForm={setShowForm}
              setShowParams={setShowParams}
              queryKey={queryKey}
            />
          </Grid>
        )}
      </Collapse>
      <div style={{ width: '100%', background: 'whitesmoke' }}>
        <div
          id="header"
          style={{
            width: '100%',
            display: 'flex',

            alignItems: 'center',
          }}
        >
          <div style={{ flex: 1 }}>
            <img
              src="https://www.ecole-st-augustin.fr/images/logo.png"
              alt="logo"
              width="192px"
            />
          </div>
        </div>
        <main style={{ margin: '1rem 0px' }}>
          <section
            style={{
              background: 'rgba(255, 196, 155, 1)',
              height: '3rem',
              lineHeight: '2.8rem',
              textAlign: 'center',
              color: 'rgba(41, 76, 96, 1)',
              fontWeight: 'bold',
            }}
          >
            <h1>Mises à jour du site</h1>
          </section>
          <section style={{ margin: '1rem 0px' }}>
            <h5>Bonjour Emilie</h5>
          </section>
          <section>Une belle journée en perspective</section>
          <section>
            <p> A tres bientot sur le site de école</p>
          </section>
        </main>
        <footer style={{ width: '100%' }}>
          <div
            style={{
              width: '100%',
              background: 'rgba(41, 76, 96, 1)',
              padding: '1rem',
              display: 'flex',
            }}
          >
            <div style={{ flex: 4 }}>
              <div style={{ marginBottom: '1rem' }}>
                <h5 style={{ color: 'white' }}>Une suggestion ?</h5>
                <span style={{ fontSize: '1rem' }}>
                  <a href="https://www.ecole-st-augustin.fr/informations/contacts/ecrire">
                    Cliquez ici
                  </a>{' '}
                  &nbsp; pour la soumettre
                </span>
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <h5 style={{ color: 'white' }}>Nous contacter ?</h5>
                <span style={{ fontSize: '1rem' }}>
                  Pendant les créneaux d &apos;ouverture lundi, mardi , jeudi et
                  vendredi`
                </span>
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ textAlign: 'center' }}> Visitez le site</div>
              <div>
                {' '}
                <img
                  src="https://www.ecole-st-augustin.fr/images/logo.png"
                  alt="logo"
                  width="150px"
                />
              </div>
            </div>
          </div>
          <div
            style={{
              fontSize: '1rem',
              fontStyle: 'italic',
              padding: '1rem 0px',
            }}
          >
            {rgpd}
          </div>
        </footer>
      </div>
    </StyledParametresGrid>
  )
}

ManageMail.propTypes = {
  setShowParams: PropTypes.func.isRequired,
}

export default ManageMail
