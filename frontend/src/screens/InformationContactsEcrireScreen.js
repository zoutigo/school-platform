/* eslint-disable import/named */
import { Grid, styled, useTheme } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from 'react-query'
import { Link, useParams } from 'react-router-dom'
import Title from '../components/elements/Title'
import TinyPageEditor from '../components/elements/TinyPageEditor'
import InputTextControl from '../components/elements/InputTextControl'
import suggestionSchema from '../schemas/suggestionSchema'
import CustomButton from '../components/elements/CustomButton'
import AlertCollapse from '../components/elements/AlertCollapse'
import { useIsTokenValid, useUpdateMutationOptions } from '../utils/hooks'
import LazyMessage from '../components/elements/LazyMessage'
import InputSelectControl from '../components/elements/InputSelectControl'
import { apiPostSuggestion } from '../utils/api'
import {
  errorAlertCollapse,
  initialAlertCollapse,
  successAlertCollapse,
} from '../constants/alerts'
import { setMutateAlert } from '../redux/alerts/AlertsActions'

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

  const dispatch = useDispatch()
  const { topic } = useParams()
  const queryKey = ['suggestions']
  const { Token } = useSelector((state) => state.user)
  const { mutate } = useSelector((state) => state.alerts)
  const { tokenIsValid } = useIsTokenValid()
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(suggestionSchema),
  })

  const { mutateAsync, isSuccess: mutationIsSuccessfull } = useMutation(
    apiPostSuggestion,
    useUpdateMutationOptions(queryKey)
  )

  // const topic = useRouteParams('topic')
  const formTitle = () => {
    switch (topic) {
      case 'idea':
        return 'Proposer une idée à lécole'
      case 'bug':
        return 'Reporter un bug'
      case 'improvment':
        return 'Proposer une amélioration du site'

      default:
        return 'écrire'
    }
  }

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

    try {
      await mutateAsync({
        id: null,
        action: 'create',
        options: options,
        body: finalDatas,
      }).then((response) => {
        dispatch(setMutateAlert(successAlertCollapse(response.message)))
        window.scrollTo(0, 0)
      })
    } catch (err) {
      setMutateAlert(errorAlertCollapse(err.response.data.message))

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
        <Link to="/login">Connectez vous maintenant.</Link>
      </p>
      <p style={{ color: 'red', fontWeight: 'bold' }}>
        <Link to="/register">Créez votre compte :</Link>
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
    (suggestion) => suggestion.value === topic
  )
  const otherTopic = suggestionOptions.find(
    (suggestion) => suggestion.value === 'other'
  )

  const initial = initialTopic || otherTopic

  useEffect(() => {
    dispatch(setMutateAlert(initialAlertCollapse))
    return () => {
      dispatch(setMutateAlert(initialAlertCollapse))
    }
  }, [])

  return (
    <Grid container>
      <AlertCollapse
        {...mutate}
        callback={() => dispatch(setMutateAlert(initialAlertCollapse))}
      />
      {!tokenIsValid && (
        <LazyMessage severity="error">
          <NotTokenIsValidMessage />
        </LazyMessage>
      )}
      {tokenIsValid && !mutationIsSuccessfull && (
        <StyledPaperForm onSubmit={handleSubmit(onSubmit)}>
          <Grid item container justify="center">
            <Title title={formTitle()} textcolor="whitesmoke" />
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
