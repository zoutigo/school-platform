import * as yup from 'yup'
import { passwordRegex, phoneRegex } from '../constants/regex'

export const updateUserCredentialsSchema = yup.object().shape({
  gender: yup.object().shape({
    label: yup.string().required('effectuez un choix'),
    value: yup.string().required('effectuez un choix'),
  }),

  firstname: yup
    .string()
    .required('le nom du parent est obligatoire')
    .min(2, `Minimum deux caractères`)
    .max(30, 'maximum 30 caractères'),

  lastname: yup
    .string()
    .required('le prénom du parent est obligatoire')
    .min(2, `Minimum deux caractères`)
    .max(30, 'maximum 30 caractères'),

  phone: yup
    .string()
    .required('le telephone est obligatoire')
    .matches(phoneRegex, 'Non valide. ex: 0618679809'),
})

export const updateUserChildrenClassesSchema = yup.object().shape({
  childrenClasses: yup.array().min(1, 'Choisir au moins une classe'),
})

export const updateUserPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .required("l'ancien mot de pass est obligatoire")
    .matches(passwordRegex, 'Mot de pass non valide'),

  newPassword: yup
    .string()
    .required('le nouveau mot de pass est obligatoire')
    .matches(passwordRegex, 'Mot de pass non valide'),

  newPasswordConfirm: yup
    .string()
    .oneOf([yup.ref('newPassword'), null], 'La saisie ne correspond pas')
    .required('Veillez confirmer le nouveau mot de pass'),
})
