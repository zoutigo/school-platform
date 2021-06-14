import * as yup from 'yup'

const eventSchema = yup.object().shape({
  text: yup
    .string()
    .required('Veillez donner une description de évènement')
    .min(20, 'au moins 20 caractères'),
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
