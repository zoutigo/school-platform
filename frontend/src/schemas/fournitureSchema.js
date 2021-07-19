import * as yup from 'yup'
import { testFileSize } from '../constants/filetests'

const entitiesAlias = [
  'ps',
  'ms',
  'gs',
  'cp',
  'ce1',
  'ce2',
  'cm1',
  'cm2',
  'adaptation',
]

const fournitureSchema = yup.object().shape({
  startdate: yup.date().required('Indiquez la date de debut'),
  enddate: yup
    .date()
    .required('indiquez la date de fin')
    .when(
      'startdate',
      (startdate, schema) =>
        startdate &&
        schema.min(
          startdate,
          'La date de fin doit etre supérieure à la date de début'
        )
    ),
  addFile: yup.string().nullable(),

  file: yup.mixed().when('addFile', {
    is: 'oui',
    then: yup
      .mixed()
      .test('fileSize', 'Le fichier est trop large', (value) =>
        testFileSize(value)
      ),
    otherwise: yup.mixed(),
  }),
  clientEntityAlias: yup
    .mixed()
    .test('EntitiesAlias', 'Doit apprtenir à la table des entités', (value) => {
      if (!value) return false
      return entitiesAlias.includes(value.value)
    }),
})

export default fournitureSchema
