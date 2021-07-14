import * as yup from 'yup'
import { testFileSize } from '../constants/filetests'

const albumSchema = yup.object().shape({
  addFile: yup.string().required('Dites si vous voulez ajouter un fichier'),
  name: yup
    .string()
    .required("le nom de l'album est obligatoire")
    .min(2, `Minimum deux caractères`)
    .max(30, 'maximum 30 caractères'),
  description: yup.string().max(200, 'maximum 300 caractères'),
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

export default albumSchema
