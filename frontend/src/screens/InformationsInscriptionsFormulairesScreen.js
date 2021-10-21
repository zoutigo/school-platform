/* eslint-disable import/named */
import { useDispatch, useSelector } from 'react-redux'
import { useSnackbar } from 'notistack'
import { Grid, styled, useTheme } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useQuery } from 'react-query'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link, useHistory } from 'react-router-dom'
import Title from '../components/elements/Title'
import InputTextControl from '../components/elements/InputTextControl'
import CustomButton from '../components/elements/CustomButton'
import InputFileControl from '../components/elements/InputFileControl'
import InputSmallEditorControl from '../components/elements/InputSmallEditorControl'
import preinscriptionSchema from '../schemas/preinscriptionSchema'
import { apiFecthUserDatas, apiPostPreInscription } from '../utils/api'
import InputSelectControl from '../components/elements/InputSelectControl'
import { classroomsOptions } from '../constants/options'
import InputRadio from '../components/elements/InputRadio'
import LazyMessage from '../components/elements/LazyMessage'
import { setLoginAlert } from '../redux/alerts/AlertsActions'
import { initialAlertCollapse } from '../constants/alerts'
import useIsTokenValid from '../components/hooks/useIsTokenValid'
import useMutate from '../components/hooks/useMutate'
import MutateCircularProgress from '../components/elements/MutateCircularProgress'
import getError from '../utils/error'

const StyledPaperForm = styled('form')(({ theme }) => ({
  width: '100%',
  margin: '1rem auto',
  background: 'gray',
  [theme.breakpoints.up('md')]: {
    width: '60%',
  },
  '& .form-fields-container': {
    background: 'whitesmoke',
    padding: '0.5rem 0.2rem',
    '& .field': {
      margin: '0.6rem 0px',
    },
  },
}))

function InformationsInscriptionsFormulairesScreen() {
  const {
    Token,
    User: { id },
  } = useSelector((state) => state.user)
  const { tokenIsValid } = useIsTokenValid()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const dispatch = useDispatch()
  const theme = useTheme()
  const history = useHistory()
  const userQueryKey = [`datas-${id}`]
  const queryKey = ['preinsciptions']
  const [userDataCompleted, setUserDataCompleted] = useState(false)
  const [addFile, setAddFile] = useState(false)
  const [addMessage, setAddMessage] = useState(false)
  const [showMutateMessage, setShowMutateMessage] = useState(false)

  const { mutateAsync, isMutating, mutationIsSuccessfull } = useMutate(
    queryKey,
    apiPostPreInscription
  )
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(preinscriptionSchema),
  })
  const formTitle = 'Formulaire de pré-inscription'

  const onSubmit = async (datas) => {
    const { childFirstname, file, message, classroomAlias } = datas

    const finalDatas = {
      classroomAlias: classroomAlias.value,
      childFirstname,
      file: file ? file[0] : null,
      message,
    }

    closeSnackbar()

    try {
      await mutateAsync({
        id: null,
        action: 'create',
        body: finalDatas,
        Token: Token,
      }).then((response) => {
        if (response.status === 201) {
          enqueueSnackbar(response.data.message, { variant: 'success' })
        }
      })
    } catch (err) {
      if (err.response.status === 498) {
        enqueueSnackbar(
          'Il semblerait que votre jeton de connexion soit arrivé à expiration',
          { variant: 'error' }
        )
        history.push('/private/identification/login')
      } else {
        enqueueSnackbar(getError(err), { variant: 'error' })
      }

      window.scrollTo(0, 0)
    }
  }

  const { data } = useQuery(userQueryKey, () => apiFecthUserDatas(id))

  useEffect(() => {
    closeSnackbar()
    if (data) {
      const { phone, firstname, lastname } = data
      if (phone && firstname && lastname) {
        setUserDataCompleted(true)
      }
    }
    return () => {
      setUserDataCompleted(false)
    }
  }, [data])

  const NotTokenIsValidMessage = () => (
    <div>
      <p>
        Pour etre sur que la pré-incription sera traitée efficacement, nous
        aurons besoin de vos coordonnées.
      </p>
      <p>
        <Link to="/private/identification/login">Connectez vous.</Link>
      </p>
      <p>Ou verifiez le mail de validation qui vous a été adressé.</p>
      <p>
        <Link to="/private/identification/register">Créez votre compte :</Link>{' '}
        <strong>Ca ne prend que une minute.</strong>
      </p>
    </div>
  )
  const NotUserDataCompletedMessage = () => (
    <div>
      <p>
        Il semblerait que vos les informations suivantes soient manquantes à
        votre profil: prénom, nom , telephone
      </p>
      <p>
        Elles sont nécéssaires au traitement efficace et prioritaire de la
        préinscription de votre enfant.
      </p>
      <p>
        <Link to="/private/account/donnees-personelles">
          Je renseigne mes informations :
        </Link>{' '}
        <strong>Ca ne prend que une minute.</strong>
      </p>
    </div>
  )
  const MutationIsSuccessfullMessage = () => (
    <div>
      <p>La pré-inscription de votre enfant a été enregistrée correctement.</p>
      <p>Vous avez reçu un recapitulatif dans votre boite mail</p>
      <p>Notre équipe va tres rapidement prendre contact avec vous. </p>
      <p>Merci de votre confiance</p>
    </div>
  )

  useEffect(() => {
    if (mutationIsSuccessfull) {
      setShowMutateMessage(true)
    }
    return () => {
      setShowMutateMessage(false)
    }
  }, [mutationIsSuccessfull])

  return (
    <Grid container>
      {showMutateMessage && (
        <LazyMessage severity="success">
          <MutationIsSuccessfullMessage />
        </LazyMessage>
      )}
      {!tokenIsValid && (
        <LazyMessage severity="error">
          <NotTokenIsValidMessage />
        </LazyMessage>
      )}
      {!userDataCompleted && tokenIsValid && (
        <LazyMessage severity="error">
          <NotUserDataCompletedMessage />
        </LazyMessage>
      )}
      {tokenIsValid && userDataCompleted && !mutationIsSuccessfull && (
        <StyledPaperForm onSubmit={handleSubmit(onSubmit)}>
          <Grid item container justify="center">
            <Title title={formTitle} textcolor="whitesmoke" />
          </Grid>
          {isMutating && <MutateCircularProgress />}
          <Grid container className="form-fields-container">
            <InputSelectControl
              control={control}
              name="classroomAlias"
              initialValue={[]}
              label="Classe de l'enfant"
              options={classroomsOptions}
            />
            <InputTextControl
              name="childFirstname"
              control={control}
              initialValue=""
              helperText="10 chiffres"
              label="Prénom de l'enfant"
              width="100%"
            />
            <InputRadio
              question="Ajouter un fichier ?"
              options={[
                { labelOption: 'Oui', optionvalue: 'oui' },
                { labelOption: 'Non', optionvalue: 'non' },
              ]}
              name="addFile"
              defaultValue="non"
              callback={setAddFile}
              control={control}
              radioGroupProps={{ row: true }}
            />
            <InputRadio
              question="Ajouter un Message ?"
              options={[
                { labelOption: 'Oui', optionvalue: 'oui' },
                { labelOption: 'Non', optionvalue: 'non' },
              ]}
              name="addMessage"
              defaultValue="non"
              callback={setAddMessage}
              control={control}
              radioGroupProps={{ row: true }}
            />
            {addFile && (
              <InputFileControl
                control={control}
                label="Pièce jointe"
                name="file"
                type="file"
                accept="application/pdf"
                helperText="maximum 5Mo"
              />
            )}

            {/* <Grid item container>
            <Controller
              name="text"
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
          </Grid> */}
            {addMessage && (
              <InputSmallEditorControl
                control={control}
                name="message"
                initialValue=""
                label="Message:"
                width="100%"
                height={200}
              />
            )}
          </Grid>
          <Grid item container alignItems="center" justify="flex-end">
            <CustomButton
              text="je poste ma pré-inscription"
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

export default InformationsInscriptionsFormulairesScreen
