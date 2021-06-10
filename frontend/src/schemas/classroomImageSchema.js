import * as yup from 'yup'

const IMAGE_MAX_SIZE = 1024 * 1024 * 2
const IMAGE_SUPPORTED_FORMATS = [
  'image/jpg',
  'image/jpeg',
  'image/gif',
  'image/png',
]

const classroomImageSchema = yup.object().shape({
  image: yup
    .mixed()
    .test(
      'fileSize',
      'Le fichier est trop large. Maximum autorisé: 2Mo',
      (value) => {
        if (!value.length) return false
        return value[0].size <= IMAGE_MAX_SIZE
      }
    )
    .test(
      'fileFormat',
      'Format non pris en charge',
      (value) => value && IMAGE_SUPPORTED_FORMATS.includes(value[0].type)
    ),
})

export default classroomImageSchema
