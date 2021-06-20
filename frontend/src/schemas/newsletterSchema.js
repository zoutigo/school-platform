import * as yup from 'yup'

const FILE_MAX_SIZE = 1024 * 1024 * 8

const newsletterSchema = yup.object().shape({
  startdate: yup.date().required('Indiquez la date de debut'),
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

export default newsletterSchema
