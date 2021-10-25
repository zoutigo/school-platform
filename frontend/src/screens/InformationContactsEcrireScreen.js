/* eslint-disable import/named */
import { Grid, styled, useTheme } from '@material-ui/core'
import { useSelector } from 'react-redux'
import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useSnackbar } from 'notistack'
import { Link, useLocation } from 'react-router-dom'
import Title from '../components/elements/Title'
import TinyPageEditor from '../components/elements/TinyPageEditor'
import InputTextControl from '../components/elements/InputTextControl'
import suggestionSchema from '../schemas/suggestionSchema'
import CustomButton from '../components/elements/CustomButton'
import LazyMessage from '../components/elements/LazyMessage'
import InputSelectControl from '../components/elements/InputSelectControl'
import { apiPostSuggestion } from '../utils/api'
import useRigths from '../components/hooks/useRigths'
import useMutate from '../components/hooks/useMutate'
import MutateCircularProgress from '../components/elements/MutateCircularProgress'
import getError from '../utils/getError'
import getResponse from '../utils/getResponse'

const StyledPaperForm = styled('form')(() => ({
  width: '100%',
  margin: '1rem auto',
  background: 'gray',
  '& .form-fields-container': {
    background: 'whitesmoke',
    padding: '0.5rem 0.2rem',
    '& .field': {
      margin: '0.6rem 0px',
    },
  },
}))

function InformationContactsEcrireScreen() {
  const theme = useTheme()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const { state: ecrireState } = useLocation()
  const queryKey = ['suggestions']
  const { Token } = useSelector((state) => state.user)
  const { userLevel } = useRigths()
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(suggestionSchema),
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
    (suggestion) => suggestion.value === ecrireState.topic
  )
  const otherTopic = suggestionOptions.find(
    (suggestion) => suggestion.value === 'other'
  )

  const initial = initialTopic || otherTopic

  return (
    <Grid container>
      {isMutating && <MutateCircularProgress />}
      {!userLevel && (
        <LazyMessage severity="error">
          <NotTokenIsValidMessage />
        </LazyMessage>
      )}
      {userLevel && !mutationIsSuccessfull && (
        <StyledPaperForm onSubmit={handleSubmit(onSubmit)}>
          <Grid item container justify="center">
            <Title
              title={ecrireState.text || 'Ecrire'}
              textcolor="whitesmoke"
            />
          </Grid>
          <Grid container className="form-fields-container">
            <InputSelectControl
              name="topic"
              control={control}
              initialValue={initial}
              options={suggestionOptions}
              label="Sujet"
            />
            <InputTextControl
              name="title"
              control={control}
              initialValue=""
              helperText="au moins 10 caractères"
              label="Titre"
              width="100%"
            />
            <Grid item container>
              <Controller
                name="message"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value } }) => (
                  <TinyPageEditor
                    onChange={onChange}
                    value={value}
                    height={200}
                  />
                )}
              />
            </Grid>
          </Grid>
          <Grid item container alignItems="center" justify="flex-end">
            <CustomButton
              text="je poste ma suggestion"
              bgcolor={theme.palette.success.main}
              action="post"
              width="300px"
              type="submit"
              disabled={!isValid || isSubmitting}
            />
          </Grid>
        </StyledPaperForm>
      )}
    </Grid>
  )
}

export default InformationContactsEcrireScreen
