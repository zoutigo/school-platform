import * as yup from 'yup'

const paperActiviteSchema = yup.object().shape({
  text: yup
    .string()
    .required('La page ne peut etre vide')
    .min(20, 'au moins 20 caractères')
    .max(50000, '50000 caractères maximum'),
})

export default paperActiviteSchema
