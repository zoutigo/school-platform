import * as yup from 'yup'
import { apiCheckEmail } from '../utils/api'

const passRegExp = new RegExp('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}$')

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
    .matches(passRegExp, 'Mot de pass non valide'),

  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null], 'La saisie ne correspond pas')
    .required('Veillez confirmer le mot de pass'),
})

export default registerSchema
