import * as yup from 'yup'

const membreSchema = yup.object().shape({
  email: yup.string().email().required("indiquez l'adresse mail"),
})

export default membreSchema
