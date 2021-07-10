import * as yup from 'yup'
import { passwordRegex } from '../constants/regex'
import { apiCheckEmail } from '../utils/api'

const registerSchema = yup.object().shape({
  email: yup
    .string()
    .required('le mail est obligatoire')
    .email(`ce format mail n'est pas valide`)
    .test(
      'emailExists',
      'ce mail appartient a un utilisateur',
      async (value) => (await apiCheckEmail(value)) === true
    ),
  password: yup
    .string()
    .required('le mot de pass est obligatoire')
    .matches(passwordRegex, 'Mot de pass non valide'),

  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null], 'La saisie ne correspond pas')
    .required('Veillez confirmer le mot de pass'),
})

export default registerSchema
