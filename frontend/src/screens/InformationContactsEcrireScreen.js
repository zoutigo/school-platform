/* eslint-disable import/named */
import { Grid, useTheme, List, ListItem, Button } from '@material-ui/core'
import { useSelector } from 'react-redux'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useSnackbar } from 'notistack'
import { Link, useLocation } from 'react-router-dom'
import Title from '../components/elements/Title'
import LazyMessage from '../components/elements/LazyMessage'
import { apiPostSuggestion } from '../utils/api'
import useRigths from '../components/hooks/useRigths'
import useMutate from '../components/hooks/useMutate'
import MutateCircularProgress from '../components/elements/MutateCircularProgress'
import getError from '../utils/getError'
import getResponse from '../utils/getResponse'
import StyledHookForm from '../components/styled-components/StyledHookForm'
import TextInput from '../components/elements/inputs/TextInput'
import SelectSingleInput from '../components/elements/inputs/SelectSingleInput'
import SmallEditorInput from '../components/elements/inputs/SmallEditorInput'

function InformationContactsEcrireScreen() {
  const theme = useTheme()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const { state: ecrireState } = useLocation()
  const queryKey = ['suggestions']
  const { Token } = useSelector((state) => state.user)
  const { userLevel } = useRigths()
  const { control, handleSubmit } = useForm({
    mode: 'onChange',
  })

  const { mutateAsync, isMutating, mutationIsSuccessfull } = useMutate(
    queryKey,
    apiPostSuggestion
  )

  const onSubmit = async (datas) => {
    const { title, message, topic: suggestionTopic } = datas

    const finalDatas = {
      title,
      message,
      topic: suggestionTopic.value,
    }

    const options = {
      headers: { 'x-access-token': Token },
    }

    closeSnackbar()

    try {
      await mutateAsync({
        id: null,
        action: 'create',
        options: options,
        body: finalDatas,
      }).then((response) => {
        enqueueSnackbar(getResponse(response), { variant: 'success' })
        window.scrollTo(0, 0)
      })
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: 'error' })
      window.scrollTo(0, 0)
    }
  }

  const NotTokenIsValidMessage = () => (
    <div>
      <p>
        Pour suggérer des des améliorations ou reporter un bug, vous devez etre
        inscrit sur le site. <br />
        Votre compte doit avoir été vérifié par mail.
      </p>
      <p style={{ color: 'green', fontWeight: 'bold' }}>
        <Link to="/private/identification/login">
          Connectez vous maintenant.
        </Link>
      </p>
      <p style={{ color: 'red', fontWeight: 'bold' }}>
        <Link to="/private/identification/register">Créez votre compte :</Link>
        <br />
        <strong>Ca ne prend que une minute.</strong>
      </p>
    </div>
  )

  const suggestionOptions = [
    {
      label: 'Reporter un bug',
      value: 'bug',
    },
    {
      label: 'Idée amélioration école',
      value: 'idea',
    },
    {
      label: 'Idée amélioration site',
      value: 'improvment',
    },
    {
      label: 'Autre sujet',
      value: 'other',
    },
  ]
  const initialTopic = suggestionOptions.find(
    (suggestion) => suggestion.value === ecrireState?.topic
  )
  const otherTopic = suggestionOptions.find(
    (suggestion) => suggestion.value === 'other'
  )

  const initial = initialTopic || otherTopic

  return (
    <Grid container data-testid="informations-contacts-ecrire-screen">
      {isMutating && <MutateCircularProgress />}
      {!userLevel && (
        <LazyMessage severity="error">
          <NotTokenIsValidMessage />
        </LazyMessage>
      )}
      {userLevel && !mutationIsSuccessfull && (
        <StyledHookForm onSubmit={handleSubmit(onSubmit)} role="form">
          <List className="form-fields-container">
            <ListItem className="field">
              <Title
                title={ecrireState?.text || 'Quelle est votre suggestion ?'}
                textcolor={theme.palette.secondary.main}
              />
            </ListItem>
            <ListItem>
              <SelectSingleInput
                name="topic"
                control={control}
                defaultValue={initial}
                label="Sujet:"
                rules={{
                  required: 'Choisir le sujet',
                }}
                example="quelle option vous convient ?"
                options={suggestionOptions}
                variant="outlined"
              />
            </ListItem>

            <ListItem className="field">
              <TextInput
                control={control}
                defaultValue=""
                name="title"
                label="Titre"
                variant="outlined"
                example="soyez précis et constructifs"
                rules={{
                  required: 'le titre est obligatoire',
                  minLength: {
                    value: 5,
                    message: 'Le titre ne peut pas avoir moins de cinq lettres',
                  },
                  maxLength: {
                    value: 50,
                    message: 'le titre ne peut avoir plus de 50 lettres',
                  },
                }}
              />
            </ListItem>

            <ListItem className="field">
              <SmallEditorInput
                name="message"
                control={control}
                defaultValue=""
                label="Description"
                rules={{
                  minLength: {
                    value: 20,
                    message: 'La suggestion doit avoir au moins 20 caractères',
                  },
                  maxLength: {
                    value: 1000,
                    message: 'La suggestion doit avoir au plus 1000 caractères',
                  },
                }}
              />
            </ListItem>

            <ListItem>
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                fullWidth
                size="large"
              >
                je poste ma suggestion
              </Button>
            </ListItem>
          </List>
        </StyledHookForm>
      )}
    </Grid>
  )
}

export default InformationContactsEcrireScreen
