import * as yup from 'yup'

const classroomSummarySchema = yup.object().shape({
  summary: yup
    .string()
    .required('la page doit avoir un contenu')
    .min(5, 'au moins 5 caractères')
    .max(1000, 'pas plus de 200 caractères'),
})

export default classroomSummarySchema
