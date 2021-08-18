import * as yup from 'yup'
import { testImageSize } from '../constants/filetests'

const albumImagesSchema = yup.object().shape({
  files: yup
    .mixed()
    .test(
      'fileSize',
      'Le fichier est trop large. Le max autorisé est 10Mo',
      (value) => testImageSize(value, 10)
    ),
})

export default albumImagesSchema
