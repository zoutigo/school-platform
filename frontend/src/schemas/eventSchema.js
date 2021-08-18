import * as yup from 'yup'

const eventSchema = yup.object().shape({
  content: yup.object().required('Veillez remplir le texte'),
  place: yup
    .string()
    .required('Veillez indiquer le lieu de deroulement')
    .min(5, 'au moins 5 caractères'),
  title: yup
    .string()
    .required('Veillez indiquer un titre')
    .min(5, 'au moins 5 caractères'),
})

export default eventSchema
