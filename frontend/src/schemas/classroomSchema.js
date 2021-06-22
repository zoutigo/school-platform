import * as yup from 'yup'

const IMAGE_MAX_SIZE = 1024 * 1024 * 2.5

const classroomSchema = yup.object().shape({
  summary: yup
    .string()
    .required('la page doit avoir un contenu')
    .min(5, 'au moins 5 caractères')
    .max(1000, 'pas plus de 200 caractères'),
  image: yup
    .mixed()
    .required('la page doit avoir un contenu')
    .test(
      'fileSize',
      'Le fichier est trop large. Maximum autorisé: 2,5Mo',
      (value) => {
        console.log('value:', value)
        return value && value[0].size <= IMAGE_MAX_SIZE
      }
    ),
})

export default classroomSchema
