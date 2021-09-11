import * as yup from 'yup'

export const membreSchema = yup.object().shape({
  email: yup.string().email().required("indiquez l'adresse mail"),
})
export const membreUserSchema = yup.object().shape({
  roles: yup.array().min(1, 'choisir un role au moins'),
})

export default membreSchema
