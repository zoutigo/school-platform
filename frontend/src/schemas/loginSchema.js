import * as yup from 'yup'

const passRegExp = new RegExp('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}$')

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required('le mail est obligatoire')
    .email(`ce format mail n'est pas valide`),

  password: yup
    .string()
    .required('le mot de pass est obligatoire')
    .matches(passRegExp, 'Mot de pass non valide'),
})

export default loginSchema
