import * as yup from 'yup'

const modalSchema = yup.object().shape({
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
  text: yup
    .string()
    .required('Veillez donner une description de évènement')
    .min(10, 'au moins 10 caractères')
    .max(500, 'au plus 500 caractères'),
  title: yup
    .string()
    .required('Veillez indiquer un titre')
    .min(5, 'au moins 5 caractères'),
})

export default modalSchema
