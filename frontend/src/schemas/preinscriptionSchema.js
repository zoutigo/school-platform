import * as yup from 'yup'
import { testFileSize } from '../constants/filetests'

const preinscriptionSchema = yup.object().shape({
  addFile: yup.string().required('Dites si vous voulez ajouter un fichier'),
  addMessage: yup.string().required('Dites si vous voulez ajouter un message'),
  childFirstname: yup
    .string()
    .required("le prénom de l'enfant est obligatoire")
    .min(2, `Minimum deux caractères`)
    .max(30, 'maximum 30 caractères'),
  classroomAlias: yup.object().required('Choisir une classe'),
  message: yup.string().max(1000, 'maximum 300 caractères'),
  file: yup.mixed().when('addFile', {
    is: 'oui',
    then: yup
      .mixed()
      .test('fileSize', 'Le fichier est trop large', (value) =>
        testFileSize(value)
      ),
    otherwise: yup.mixed(),
  }),
})

export default preinscriptionSchema
