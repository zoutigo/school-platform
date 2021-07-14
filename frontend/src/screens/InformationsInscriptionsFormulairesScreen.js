/* eslint-disable import/named */
import { useSelector } from 'react-redux'
import { Grid, styled, useTheme } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link } from 'react-router-dom'
import Title from '../components/elements/Title'
import InputTextControl from '../components/elements/InputTextControl'
import CustomButton from '../components/elements/CustomButton'
import InputFileControl from '../components/elements/InputFileControl'
import InputSmallEditorControl from '../components/elements/InputSmallEditorControl'
import preinscriptionSchema from '../schemas/preinscriptionSchema'
import { useIsTokenValid, useUpdateMutationOptions } from '../utils/hooks'
import { apiFecthUserDatas, apiPostPreInscription } from '../utils/api'
import AlertCollapse from '../components/elements/AlertCollapse'
import InputSelectControl from '../components/elements/InputSelectControl'
import { classroomsOptions } from '../constants/options'
import InputRadio from '../components/elements/InputRadio'
import LazyMessage from '../components/elements/LazyMessage'

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
    User: { _id },
  } = useSelector((state) => state.user)
  const { tokenIsValid } = useIsTokenValid()

  const theme = useTheme()
  const userQueryKey = [`datas-${_id}`]
  const queryKey = ['preinsciptions']
  const [userDataCompleted, setUserDataCompleted] = useState(false)
  const [addFile, setAddFile] = useState(false)
  const [addMessage, setAddMessage] = useState(false)
  const [alert, setAlert] = useState({
    openAlert: false,
    severity: 'error',
    alertText: '',
  })
  const { mutateAsync, isSuccess: mutationIsSuccessfull } = useMutation(
    apiPostPreInscription,
    useUpdateMutationOptions(queryKey)
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
    const options = {
      headers: {
        'x-access-token': Token,
      },
    }

    try {
      await mutateAsync({
        id: null,
        action: 'create',
        options: options,
        body: finalDatas,
        token: Token,
      }).then((response) => {
        console.log('response', response)
        if (response.status === 201) {
          setAlert({
            openAlert: true,
            severity: 'success',
            alertText: response.data.message,
          })
        }
      })
    } catch (err) {
      console.log('errorrrrr', err)
      setAlert({
        openAlert: true,
        severity: 'error',
        alertText: err.data.message,
      })

      window.scrollTo(0, 0)
    }
  }

  const { data } = useQuery(userQueryKey, () => apiFecthUserDatas(_id))

  useEffect(() => {
    if (data) {
      const { phone, firstname, lastname } = data
      if (phone && firstname && lastname) {
        setUserDataCompleted(true)
      }
    }
    return () => {
      setUserDataCompleted(true)
    }
  }, [data])

  const NotTokenIsValidMessage = () => (
    <div>
      <p>
        Pour etre sur que la pré-incription sera traitée efficacement, nous
        aurons besoin de vos coordonnées.
      </p>
      <p>
        <Link to="/login">Connectez vous.</Link>
      </p>
      <p>
        <Link to="/register">Créez votre compte :</Link>{' '}
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

  return (
    <Grid container>
      {mutationIsSuccessfull && (
        <LazyMessage severity="error">
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
          <AlertCollapse {...alert} />
          <Grid item container justify="center">
            <Title title={formTitle} textcolor="whitesmoke" />
          </Grid>
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
