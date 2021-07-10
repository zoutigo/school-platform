import * as yup from 'yup'
import { passwordRegex } from '../constants/regex'

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required('le mail est obligatoire')
    .email(`ce format mail n'est pas valide`),

  password: yup
    .string()
    .required('le mot de pass est obligatoire')
    .matches(passwordRegex, 'Mot de pass non valide'),
})

export default loginSchema
