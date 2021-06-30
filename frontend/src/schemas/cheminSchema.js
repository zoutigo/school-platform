import * as yup from 'yup'

const IMAGE_MAX_SIZE = 1024 * 1024 * 2

const cheminSchema = yup.object().shape({
  alias: yup
    .string()
    .required('Veillez donner une description de évènement')
    .min(2, 'au moins 20 caractères')
    .max(10000, '10000 caractères maximum'),
  path: yup
    .string()
    .required('Veillez indiquer un titre')
    .min(5, 'au moins 5 caractères')
    .max(100, '50 caracètes mximum'),
  description: yup
    .string()
    .required('Veillez indiquer un titre')
    .min(3, 'au moins 5 caractères')
    .max(300, '50 caracètes mximum'),
  // file: yup
  //   .mixed()
  //   .test(
  //     'fileSize',
  //     'Le fichier est trop large. Maximum autorisé: 2Mo',
  //     (value) => {
  //       if (!value.length) return false
  //       return value[0].size <= IMAGE_MAX_SIZE
  //     }
  //   ),
})

export default cheminSchema
