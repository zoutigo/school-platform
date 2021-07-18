import * as yup from 'yup'

const suggestionSchema = yup.object().shape({
  message: yup
    .string()
    .required('Veillez donner une description de évènement')
    .min(20, 'au moins 20 caractères')
    .max(10000, '10000 caractères maximum'),
  title: yup
    .string()
    .required('Veillez indiquer un titre')
    .min(5, 'au moins 5 caractères')
    .max(50, '50 caracètes mximum'),
})

export default suggestionSchema
