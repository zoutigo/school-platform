/* eslint-disable arrow-body-style */
import { useForm, Controller } from 'react-hook-form'
import React, { useEffect } from 'react'
import { Grid, List, ListItem, TextField } from '@material-ui/core'
import { styled } from '@material-ui/styles'

const datas = {
  id: 1,
  addressNumber: '144B',
  addressStreet: 'route de Cremieu',
  addressZipcode: '38230',
  addressCity: 'Tignieu Jameyzieu',
  nbrStudents: 210,
  nbreTeachers: 10,
  nbreFamilies: 350,
  nbreActivities: 600,
  email: 'test@gmail.com',
  phone: '0434512390',
  secret: 'OGEPI-20890',
  schoolYearStartdate: '01/09/2019',
  schoolYearEnddate: '31/06/2020',
  managerMessage: 'hello',
  partner1Name: 'La paroisse Saint Martin',
  partner1Link: 'www.st-martin.com',
  partner2Name: 'La paroisse Saint Martin',
  partner2Link: 'www.st-martin.com',
  partner3Name: 'La paroisse Saint Martin',
  partner3Link: 'www.st-martin.com',
}

const StyledParamsForm = styled('form')(() => ({
  width: '100%',
  margin: '2.5rem 0',
}))
function ManageParamsForm() {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid, errors },
    getValues,
    setValue,
  } = useForm({
    mode: 'onChange',
    defaultValues: datas,
  })

  useEffect(() => {
    return () => {
      setValue('addressStreet', datas.addressStreet)
    }
  }, [setValue])
  return (
    <StyledParamsForm>
      <Grid item container spacing={5} style={{ background: 'yellow' }}>
        <Grid item xs={12} md={6} style={{ background: 'green' }}>
          <List>
            <ListItem>
              <Controller
                control={control}
                name="addressStreet"
                defaulValue=""
                rules={{
                  required: 'la rue est obligatoire',
                  minLength: {
                    value: 2,
                    message: 'la rue doit avoir au moins deux caractères',
                  },
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="nom-de-la-rue"
                    label="Nom de la rue"
                    placeholder="Nom de la rue"
                    error={Boolean(errors.addressStreet)}
                    helperText={
                      errors.addressStreet ? errors.addressStreet.message : ''
                    }
                    {...field}
                  />
                )}
              />
            </ListItem>
            <ListItem>
              <Controller
                control={control}
                name="addressNumber"
                rules={{
                  required: 'le numéro est obligatoire',
                  validate: (value) => value,
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="numero"
                    label="Numéro"
                    placeholder="Numéro de la rue"
                    error={Boolean(errors.addressNumber)}
                    helperText={
                      errors.addressNumber ? errors.addressNumber.message : ''
                    }
                    {...field}
                  />
                )}
              />
            </ListItem>
            <ListItem>
              <Controller
                control={control}
                name="addressZipcode"
                rules={{
                  required: 'le code postal est obligatoire',
                  minLength: [5, 'le code postal est obligatoire'],
                  validate: (value) => value > 0,
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="code-postal"
                    label="Code Postal"
                    placeholder="Code Postal"
                    error={Boolean(errors.addressZipcode)}
                    helperText={
                      errors.addressZipcode ? errors.addressZipcode.message : ''
                    }
                    {...field}
                  />
                )}
              />
            </ListItem>
            <ListItem>
              <Controller
                control={control}
                name="addressCity"
                rules={{
                  required: 'La ville est obligatoire',
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="ville"
                    label="Ville"
                    placeholder="ville"
                    error={Boolean(errors.addressCity)}
                    helperText={
                      errors.addressCity ? errors.addressCity.message : ''
                    }
                    {...field}
                  />
                )}
              />
            </ListItem>
            <ListItem>
              <Controller
                control={control}
                name="email"
                rules={{
                  required: 'La mail est obligatoire',
                  pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/,
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="email"
                    label="Email"
                    placeholder="email"
                    inputProps={{ type: 'email' }}
                    error={Boolean(errors.email)}
                    helperText={errors.email ? errors.email.message : ''}
                    {...field}
                  />
                )}
              />
            </ListItem>
            <ListItem>
              <Controller
                control={control}
                name="phone"
                rules={{
                  required: 'Le telephone est obligatoire',
                  pattern: /^[+](\d{3})\)?(\d{3})(\d{5,6})$|^(\d{10,10})$/,
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="email"
                    label="Email"
                    placeholder="email"
                    inputProps={{ type: 'email' }}
                    error={Boolean(errors.email)}
                    helperText={errors.email ? errors.email.message : ''}
                    {...field}
                  />
                )}
              />
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </StyledParamsForm>
  )
}

export default ManageParamsForm
