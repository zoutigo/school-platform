import * as yup from 'yup'
import { passwordRegex } from '../constants/regex'

export const lossPassEmailSchema = yup.object().shape({
  email: yup
    .string()
    .required('le mail est obligatoire')
    .email(`ce format mail n'est pas valide`),
})

export const lossPassPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .required('le mot de pass est obligatoire')
    .matches(passwordRegex, 'Mot de pass non valide'),

  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null], 'La saisie ne correspond pas')
    .required('Veillez confirmer le mot de pass'),
})
