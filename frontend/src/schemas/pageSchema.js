import * as yup from 'yup'

const paperActiviteSchema = yup.object().shape({
  content: yup.object().required('Veillez remplir le texte'),
})

export default paperActiviteSchema
