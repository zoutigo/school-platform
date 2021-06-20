import * as yup from 'yup'

const FILE_MAX_SIZE = 1024 * 1024 * 4

const menuSchema = yup.object().shape({
  startdate: yup.date().required('Indiquez la date de debut'),
  enddate: yup
    .date()
    .required('indiquez la date de fin')
    .when(
      'startdate',
      (startdate, schema) =>
        startdate &&
        schema.min(
          startdate,
          'La date de fin doit etre supérieure à la date de début'
        )
    ),
  file: yup
    .mixed()
    .required('Attachez la pièce jointe')
    .test(
      'fileSize',
      'Le fichier est trop large. Maximum autorisé: 2Mo',
      (value) => {
        if (!value.length) return false
        return value[0].size <= FILE_MAX_SIZE
      }
    ),
})

export default menuSchema
