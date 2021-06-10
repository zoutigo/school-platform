import * as yup from 'yup'

const classroomSummarySchema = yup.object().shape({
  summary: yup
    .string()
    .required('la page doit avoir un contenu')
    .min(5, 'au moins 5 caractères'),
})

export default classroomSummarySchema
