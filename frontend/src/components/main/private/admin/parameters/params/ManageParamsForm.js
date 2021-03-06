/* eslint-disable arrow-body-style */
import { useForm, Controller } from 'react-hook-form'
import { DatePicker } from '@material-ui/pickers'
import React from 'react'
import PropTypes from 'prop-types'
import { Grid, List, ListItem, TextField, Button } from '@material-ui/core'
import { styled, makeStyles } from '@material-ui/styles'
import { apiFecthParametres } from '../../../../../../utils/api'
import useFetch from '../../../../../hooks/useFetch'
import AlertMessage from '../../../../../elements/AlertMessage'
import FetchCircularProgress from '../../../../../elements/FetchCircularProgress'

const StyledParamsForm = styled('form')(() => ({
  width: '100%',
  margin: '2.5rem 0',
}))

const useHelperTextStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.error.main,
  },
}))
function ManageParamsForm({ queryKey, queryParams }) {
  const helperTextStyles = useHelperTextStyles()
  const { isLoading, isError, data, errorMessage } = useFetch(
    queryKey,
    queryParams,
    apiFecthParametres
  )
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid, errors },
    getValues,
    setValue,
  } = useForm({
    mode: 'onChange',
    defaultValues: data,
  })

  return (
    <Grid container data-testid="parametres-form-screen">
      {isError && <AlertMessage severity="error" message={errorMessage} />}
      {isLoading && <FetchCircularProgress color="secondary" />}

      {data && (
        <StyledParamsForm role="form">
          <Grid item container spacing={5}>
            <Grid item xs={12} md={6}>
              <List>
                <ListItem>
                  <Controller
                    control={control}
                    name="addressStreet"
                    defaulValue=""
                    rules={{
                      required: 'la rue est obligatoire',
                      minLength: {
                        value: 5,
                        message: 'la rue doit avoir au moins cinq caractères',
                      },
                      maxLength: {
                        value: 100,
                        message: 'la rue doit avoir au plus cent caractères',
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
                          errors.addressStreet
                            ? errors.addressStreet.message
                            : ''
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
                      required: 'le numéro de la voie est obligatoire',
                      maxLength: {
                        value: 10,
                        message:
                          'le numéro de la voie doit avoir au plus 10 caractères',
                      },
                    }}
                    render={({ field }) => (
                      <TextField
                        variant="outlined"
                        fullWidth
                        id="numero"
                        label="Numéro de la voie"
                        placeholder="Numéro de la voie"
                        error={Boolean(errors.addressNumber)}
                        helperText={
                          errors.addressNumber
                            ? errors.addressNumber.message
                            : ''
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
                      validate: {
                        length: (value) =>
                          value.length === 5 ||
                          'le code potal doit avoir 5 chiffres',
                        number: (value) =>
                          Number.isInteger(value) ||
                          'le code postal doit etre un nombre entier',
                      },
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
                          errors.addressZipcode
                            ? errors.addressZipcode.message
                            : ''
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
                      minLength: {
                        value: 5,
                        message: 'la ville doit avoir au moins cinq caractères',
                      },
                      maxLength: {
                        value: 20,
                        message: 'la rue doit avoir au plus 20 caractères',
                      },
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
                      maxLength: {
                        value: 50,
                        message: 'le mail doit avoir au plus 50 caractères',
                      },
                      pattern: {
                        value: /^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/,
                        message: 'le format mail est incorrect',
                      },
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
                      pattern: {
                        value: /^[+](\d{3})\)?(\d{3})(\d{5,6})$|^(\d{10,10})$/,
                        message:
                          "le format de telephone saisi n'est pas valide.",
                      },
                    }}
                    render={({ field }) => (
                      <TextField
                        variant="outlined"
                        fullWidth
                        id="phone"
                        label="Telephone"
                        placeholder="Telephone"
                        error={Boolean(errors.phone)}
                        helperText={errors.phone ? errors.phone.message : ''}
                        {...field}
                      />
                    )}
                  />
                </ListItem>
                <ListItem>
                  <Controller
                    control={control}
                    name="secret"
                    rules={{
                      required: "Le mot de pass de l'école est obligatoire",
                      maxLength: {
                        value: 20,
                        message:
                          "Le mot de pass de l'école doit avoir au plus 20 caractères",
                      },
                    }}
                    render={({ field }) => (
                      <TextField
                        variant="outlined"
                        fullWidth
                        id="secret"
                        label="Mot de pass de l'école"
                        placeholder="secret"
                        error={Boolean(errors.secret)}
                        helperText={errors.secret ? errors.secret.message : ''}
                        {...field}
                      />
                    )}
                  />
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={12} md={6}>
              <List>
                <ListItem>
                  <Controller
                    control={control}
                    name="nbrStudents"
                    rules={{
                      required: "le nombre d'élèves est obligatoire",
                      maxLength: {
                        value: 5,
                        message:
                          "le nombre d'élèves doit avoir au plus 5 caractères",
                      },
                      validate: {
                        number: (value) =>
                          Number.isInteger(value) ||
                          "le nombre d'élèves doit etre un nombre entier",
                      },
                      max: {
                        value: 20000,
                        message:
                          "le nombre d'élèves doit etre inférieur à 20000",
                      },
                    }}
                    render={({ field }) => (
                      <TextField
                        variant="outlined"
                        fullWidth
                        id="nbrStudents"
                        label="Nombre d'élèves"
                        placeholder="Nom de la rue"
                        error={Boolean(errors.nbrStudents)}
                        helperText={
                          errors.nbrStudents ? errors.nbrStudents.message : ''
                        }
                        {...field}
                      />
                    )}
                  />
                </ListItem>
                <ListItem>
                  <Controller
                    control={control}
                    name="nbrTeachers"
                    rules={{
                      required: "le nombre d'enseignants est obligatoire",
                      maxLength: {
                        value: 2,
                        message:
                          "le nombre d'enseignants doit avoir au plus 2 caractères",
                      },
                      validate: {
                        number: (value) =>
                          Number.isInteger(value) ||
                          "le nombre d'enseignants doit etre un nombre entier",
                      },
                    }}
                    render={({ field }) => (
                      <TextField
                        variant="outlined"
                        fullWidth
                        id="nbrTeachers"
                        label="Nombre d'enseignants"
                        placeholder="Nombre d'enseignants"
                        error={Boolean(errors.nbrTeachers)}
                        helperText={
                          errors.nbrTeachers ? errors.nbrTeachers.message : ''
                        }
                        {...field}
                      />
                    )}
                  />
                </ListItem>
                <ListItem>
                  <Controller
                    control={control}
                    name="nbrFamilies"
                    rules={{
                      required: 'le nombre de familles est obligatoire',
                      maxLength: {
                        value: 3,
                        message:
                          'le nombre de familles doit avoir au plus 3 caractères',
                      },
                      validate: {
                        number: (value) =>
                          Number.isInteger(value) ||
                          'le nombre de familles doit etre un nombre entier',
                      },
                    }}
                    render={({ field }) => (
                      <TextField
                        variant="outlined"
                        fullWidth
                        id="nbrFamilies"
                        label="Nombre de familles"
                        placeholder="Nombre de familles"
                        error={Boolean(errors.nbrFamilies)}
                        helperText={
                          errors.nbrFamilies ? errors.nbrFamilies.message : ''
                        }
                        {...field}
                      />
                    )}
                  />
                </ListItem>
                <ListItem>
                  <Controller
                    control={control}
                    name="nbrActivities"
                    rules={{
                      required: "le nombre d'activités est obligatoire",
                      maxLength: {
                        value: 4,
                        message:
                          "le nombre d'activités doit avoir au plus 4 caractères",
                      },
                      validate: {
                        number: (value) =>
                          Number.isInteger(value) ||
                          "le nombre d'activités doit etre un nombre entier",
                      },
                    }}
                    render={({ field }) => (
                      <TextField
                        variant="outlined"
                        fullWidth
                        id="nbrActivities"
                        label="Nombre d'activités"
                        placeholder="Nombre d'activités"
                        error={Boolean(errors.nbrActivities)}
                        helperText={
                          errors.nbrActivities
                            ? errors.nbrActivities.message
                            : ''
                        }
                        {...field}
                      />
                    )}
                  />
                </ListItem>

                <ListItem>
                  <Controller
                    control={control}
                    name="schoolYearStartdate"
                    rules={{
                      required: 'La date de rentrée scolaire est obligatoire',
                    }}
                    render={({ field }) => (
                      <TextField
                        variant="outlined"
                        fullWidth
                        id="schoolYearStartdate"
                        label="La date de rentrée scolaire"
                        placeholder="La date de rentrée scolaire"
                        type="date"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        error={Boolean(errors.schoolYearStartdate)}
                        helperText={
                          errors.schoolYearStartdate
                            ? errors.schoolYearStartdate.message
                            : ''
                        }
                        {...field}
                      />
                    )}
                  />
                </ListItem>
                <ListItem>
                  <Controller
                    control={control}
                    name="schoolYearEnddate"
                    rules={{
                      required:
                        "La date de fin d'année scolaire est obligatoire",
                    }}
                    render={({ field }) => (
                      <TextField
                        variant="outlined"
                        fullWidth
                        id="schoolYearEnddate"
                        label="La date de fin d'année scolaire"
                        placeholder="La date de fin d'année scolaire"
                        type="date"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        error={Boolean(errors.schoolYearEnddate)}
                        helperText={
                          errors.schoolYearEnddate
                            ? errors.schoolYearEnddate.message
                            : ''
                        }
                        {...field}
                      />
                    )}
                  />
                </ListItem>
                <ListItem>
                  <Controller
                    control={control}
                    name="schoolYearEnddate"
                    rules={{
                      required:
                        "La date de fin d'année scolaire est obligatoire",
                    }}
                    render={({ field }) => (
                      <DatePicker
                        {...field}
                        autoOk
                        clearable
                        minDate={new Date()}
                        style={{ width: '100%' }}
                        label="Date de l'évènement"
                        format="dddd Do MMMM yyyy"
                        inputVariant="outlined"
                        FormHelperTextProps={{
                          classes: {
                            root: helperTextStyles.root,
                          },
                        }}
                        helperText={
                          errors.schoolYearEnddateTest
                            ? errors.schoolYearEnddateTest.message
                            : ''
                        }
                        onChange={(e) => field.onChange(e)}
                      />
                    )}
                  />
                </ListItem>
              </List>
            </Grid>
          </Grid>
          <Grid item container>
            <Grid item container>
              <Button
                type="submit"
                fullWidth
                color="secondary"
                variant="contained"
              >
                Je modifie les paramètres
              </Button>
            </Grid>
          </Grid>
          <Grid item container spacing={5}>
            <Grid item xs={12} md={6}>
              <List style={{ margin: '0.5rem 0px' }}>
                <ListItem>
                  <Controller
                    control={control}
                    name="partner1Name"
                    rules={{
                      required: 'Le nom du partenaire est obligatoire',
                    }}
                    render={({ field }) => (
                      <TextField
                        variant="outlined"
                        fullWidth
                        id="partner1Name"
                        label="Nom du partenaire 1"
                        placeholder="Nom du partenaire 1"
                        error={Boolean(errors.partner1Name)}
                        helperText={
                          errors.partner1Name ? errors.partner1Name.message : ''
                        }
                        {...field}
                      />
                    )}
                  />{' '}
                </ListItem>
                <ListItem>
                  <Controller
                    control={control}
                    name="partner1Link"
                    rules={{
                      required: 'Le lien du partenaire est obligatoire',
                    }}
                    render={({ field }) => (
                      <TextField
                        variant="outlined"
                        fullWidth
                        id="partner1Link"
                        label="Lien du partenaire 1"
                        placeholder="Lien du partenaire 1"
                        error={Boolean(errors.partner1Link)}
                        helperText={
                          errors.partner1Link ? errors.partner1Link.message : ''
                        }
                        {...field}
                      />
                    )}
                  />
                </ListItem>
              </List>
              <List style={{ margin: '0.5rem 0px' }}>
                <ListItem>
                  <Controller
                    control={control}
                    name="partner2Name"
                    rules={{
                      required: 'Le nom du partenaire est obligatoire',
                    }}
                    render={({ field }) => (
                      <TextField
                        variant="outlined"
                        fullWidth
                        id="partner2Name"
                        label="Nom du partenaire 2"
                        placeholder="Nom du partenaire 2"
                        error={Boolean(errors.partner2Name)}
                        helperText={
                          errors.partner2Name ? errors.partner2Name.message : ''
                        }
                        {...field}
                      />
                    )}
                  />{' '}
                </ListItem>
                <ListItem>
                  <Controller
                    control={control}
                    name="partner2Link"
                    rules={{
                      required: 'Le lien du partenaire est obligatoire',
                    }}
                    render={({ field }) => (
                      <TextField
                        variant="outlined"
                        fullWidth
                        id="partner2Link"
                        label="Lien du partenaire 2"
                        placeholder="Lien du partenaire 2"
                        error={Boolean(errors.partner2Link)}
                        helperText={
                          errors.partner2Link ? errors.partner2Link.message : ''
                        }
                        {...field}
                      />
                    )}
                  />
                </ListItem>
              </List>
              <List style={{ margin: '0.5rem 0px' }}>
                <ListItem>
                  <Controller
                    control={control}
                    name="partner3Name"
                    rules={{
                      required: 'Le nom du partenaire est obligatoire',
                    }}
                    render={({ field }) => (
                      <TextField
                        variant="outlined"
                        fullWidth
                        id="partner3Name"
                        label="Nom du partenaire 3"
                        placeholder="Nom du partenaire 3"
                        error={Boolean(errors.partner3Name)}
                        helperText={
                          errors.partner3Name ? errors.partner3Name.message : ''
                        }
                        {...field}
                      />
                    )}
                  />{' '}
                </ListItem>
                <ListItem>
                  <Controller
                    control={control}
                    name="partner3Link"
                    rules={{
                      required: 'Le lien du partenaire est obligatoire',
                    }}
                    render={({ field }) => (
                      <TextField
                        variant="outlined"
                        fullWidth
                        id="partner3Link"
                        label="Lien du partenaire 3"
                        placeholder="Lien du partenaire 3"
                        error={Boolean(errors.partner3Link)}
                        helperText={
                          errors.partner3Link ? errors.partner3Link.message : ''
                        }
                        {...field}
                      />
                    )}
                  />
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={12} md={6}>
              <List>
                <ListItem>
                  <Controller
                    control={control}
                    name="managerMessage"
                    rules={{
                      required: 'Le mot du directeur est obligatoire',
                    }}
                    render={({ field }) => (
                      <TextField
                        variant="outlined"
                        fullWidth
                        multiline
                        id="managerMessage"
                        label="Mot du directeur"
                        placeholder="Mot du directeur"
                        error={Boolean(errors.managerMessage)}
                        helperText={
                          errors.managerMessage
                            ? errors.managerMessage.message
                            : ''
                        }
                        {...field}
                      />
                    )}
                  />
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </StyledParamsForm>
      )}
    </Grid>
  )
}

ManageParamsForm.propTypes = {
  queryKey: PropTypes.arrayOf(PropTypes.string).isRequired,
  queryParams: PropTypes.string.isRequired,
}

export default ManageParamsForm
