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
    .matches(
      passwordRegex,
      'au moins 8 caractères, dont 1 chiffre, 1 majuscule, 1 minuscule'
    ),

  passwordConfirm: yup
    .string()
    .oneOf(
      [yup.ref('password'), null],
      'La saisie ne correspond pas au mot de pass précédent'
    )
    .required('Veillez confirmer le mot de pass'),
})

export default registerSchema
