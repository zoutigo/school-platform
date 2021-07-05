import * as yup from 'yup'

const phoneRegExp = new RegExp('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}$')

// const regex = new RegExp(/^[+](d{3}))?(d{3})(d{5,6})$|^(d{10,10})$/)
const reg = `/^[+](d{3}))?(d{3})(d{5,6})$|^(d{10,10})$/`
const regex = new RegExp(/^[+](\d{3})\)?(\d{3})(\d{5,6})$|^(\d{10,10})$/)

const re = new RegExp('\\w+')
const FILE_MAX_SIZE = 1024 * 1024 * 4

const preinscriptionSchema = yup.object().shape({
  email: yup
    .string()
    .required('le mail est obligatoire')
    .email(`ce format mail n'est pas valide`),

  parentFirstname: yup
    .string()
    .required('le nom du parent est obligatoire')
    .min(2, `Minimum deux caractères`)
    .max(30, 'maximum 30 caractères'),

  parentLastname: yup
    .string()
    .required('le prénom du parent est obligatoire')
    .min(2, `Minimum deux caractères`)
    .max(30, 'maximum 30 caractères'),

  childFirstname: yup
    .string()
    .required("le prénom de l'enfant est obligatoire")
    .min(2, `Minimum deux caractères`)
    .max(30, 'maximum 30 caractères'),

  phone: yup
    .string()
    .required('le telephone est obligatoire')
    .matches(regex, 'Mot de pass non valide'),

  message: yup.string().max(300, 'maximum 300 caractères'),

  //   file: yup
  //     .mixed()
  //     .required('Attachez la pièce jointe')
  //     .test(
  //       'fileSize',
  //       'Le fichier est trop large. Maximum autorisé: 4Mo',
  //       (value) => {
  //         if (!value.length) return false
  //         return value[0].size <= FILE_MAX_SIZE
  //       }
  //     ),
})

export default preinscriptionSchema
