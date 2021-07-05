import { useSelector } from 'react-redux'
import { Grid, styled, useTheme } from '@material-ui/core'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { yupResolver } from '@hookform/resolvers/yup'
import { useHistory } from 'react-router-dom'
import Title from '../components/elements/Title'
import InputTextControl from '../components/elements/InputTextControl'
import CustomButton from '../components/elements/CustomButton'
import InputFileControl from '../components/elements/InputFileControl'
import InputSmallEditorControl from '../components/elements/InputSmallEditorControl'
import preinscriptionSchema from '../schemas/preinscriptionSchema'
import { useUpdateMutationOptions } from '../utils/hooks'
import { apiPostPreInscription } from '../utils/api'
import AlertCollapse from '../components/elements/AlertCollapse'

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
  const { Token } = useSelector((state) => state.user)
  const history = useHistory()
  const theme = useTheme()
  const queryKey = ['preinsciptions']
  const [alert, setAlert] = useState({
    openAlert: false,
    severity: 'error',
    alertText: '',
  })
  const { mutateAsync } = useMutation(
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
    const {
      parentFirstname,
      parentLastname,
      email,
      phone,
      childFirstname,
      file,
      message,
    } = datas

    const finalDatas = {
      parentFirstname,
      parentLastname,
      email,
      phone,
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
        history.pushState('/private/account/demandes')
      })
    } catch (err) {
      setAlert({
        openAlert: true,
        severity: 'error',
        alertText: err.data.message,
      })

      window.scrollTo(0, 0)
    }
  }
  return (
    <Grid container>
      <StyledPaperForm onSubmit={handleSubmit(onSubmit)}>
        <AlertCollapse {...alert} />
        <Grid item container justify="center">
          <Title title={formTitle} textcolor="whitesmoke" />
        </Grid>
        <Grid container className="form-fields-container">
          <InputTextControl
            name="parentFirstname"
            control={control}
            initialValue=""
            helperText="au moins 2 caractères"
            label="Prénom du parent"
            width="100%"
          />
          <InputTextControl
            name="parentLastname"
            control={control}
            initialValue=""
            helperText="au moins 2 caractères"
            label="Nom du parent"
            width="100%"
          />
          <InputTextControl
            name="phone"
            control={control}
            initialValue=""
            helperText="ex: 0618657934 ou +33178569054"
            label="Telephone"
            width="100%"
          />
          <InputTextControl
            name="email"
            control={control}
            initialValue=""
            helperText="ex: romain@gmail.com"
            label="Email"
            width="100%"
          />
          <InputFileControl
            control={control}
            label="Pièce jointe"
            name="file"
            type="file"
            accept="application/pdf"
            helperText="maximum 5Mo"
          />
          <InputTextControl
            name="childFirstname"
            control={control}
            initialValue=""
            helperText="10 chiffres"
            label="Prénom de l'enfant"
            width="100%"
          />
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
          <InputSmallEditorControl
            control={control}
            name="message"
            initialValue=""
            label="Commentaires:"
            width="100%"
            height={200}
          />
        </Grid>
        <Grid item container alignItems="center" justify="flex-end">
          <CustomButton
            text="je poste ma pré-inscription"
            bgcolor={theme.palette.success.main}
            action="post"
            width="300px"
            type="submit"
            // disabled={!isValid || isSubmitting}
          />
        </Grid>
      </StyledPaperForm>
    </Grid>
  )
}

export default InformationsInscriptionsFormulairesScreen
