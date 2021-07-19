import * as yup from 'yup'
import { testFileSize } from '../constants/filetests'

const newsletterSchema = yup.object().shape({
  startdate: yup.date().required('Indiquez la date de debut'),
  addFile: yup.string().nullable(),

  file: yup.mixed().when('addFile', {
    is: 'oui',
    then: yup
      .mixed()
      .test('fileSize', 'Le fichier est trop large', (value) =>
        testFileSize(value, 8)
      ),
    otherwise: yup.mixed(),
  }),
})

export default newsletterSchema
