import * as yup from 'yup'
import { testFileSize } from '../constants/filetests'

const albumImagesSchema = yup.object().shape({
  files: yup
    .mixed()
    .test('fileSize', 'Le fichier est trop large', (value) =>
      testFileSize(value)
    ),
})

export default albumImagesSchema
