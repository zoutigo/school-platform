import * as yup from 'yup'

const paperActiviteSchema = yup.object().shape({
  // text: yup.object().required('Veillez remplir le texte'),
  content: yup.object().required('Veillez remplir le texte'),
  title: yup
    .string()
    .required('Veillez indiquer un titre')
    .min(5, 'au moins 5 caractères')
    .max(50, '50 caracètes mximum'),
})

export default paperActiviteSchema
