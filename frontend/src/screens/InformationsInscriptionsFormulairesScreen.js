import { Grid, styled, useTheme } from '@material-ui/core'
import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useHistory } from 'react-router-dom'
import Title from '../components/elements/Title'
import TinyPageEditor from '../components/elements/TinyPageEditor'
import InputTextControl from '../components/elements/InputTextControl'
import suggestionSchema from '../schemas/suggestionSchema'
import CustomButton from '../components/elements/CustomButton'

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
  const theme = useTheme()
  const history = useHistory()
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(suggestionSchema),
  })
  const formTitle = 'Formulaire de pré-inscription'

  const onSubmit = async (datas) => {
    const { title, text } = datas

    const finalDatas = {
      title,
      text,
    }

    alert('votre pré-inscription a été prise en compte a été pris en compte')

    history.push('/')
  }
  return (
    <Grid container>
      <StyledPaperForm onSubmit={handleSubmit(onSubmit)}>
        <Grid item container justify="center">
          <Title title={formTitle} textcolor="whitesmoke" />
        </Grid>
        <Grid container className="form-fields-container">
          <InputTextControl
            name="firstname"
            control={control}
            initialValue=""
            helperText="au moins 2 caractères"
            label="Prénom du parent"
            width="100%"
          />
          <InputTextControl
            name="lastname"
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
            helperText="10 chiffres"
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
          <InputTextControl
            name="childfirstname"
            control={control}
            initialValue=""
            helperText="10 chiffres"
            label="Prénom de l'enfant"
            width="100%"
          />
          <Grid item container>
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
          </Grid>
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
    </Grid>
  )
}

export default InformationsInscriptionsFormulairesScreen
