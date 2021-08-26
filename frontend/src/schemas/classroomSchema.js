import * as yup from 'yup'

const classroomSchema = yup.object().shape({
  content: yup.object().required('la page doit avoir un contenu'),
  email: yup.mixed().when('isAllowed', {
    is: 'oui',
    then: yup
      .string()
      .required('le champ mail ne doit pas etre vide')
      .email('le format doit etre un email'),
    otherwise: yup.mixed(),
  }),
})

export default classroomSchema
