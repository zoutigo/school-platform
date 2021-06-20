import * as yup from 'yup'

const IMAGE_MAX_SIZE = 1024 * 1024 * 4

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
    ),
})

export default classroomImageSchema
