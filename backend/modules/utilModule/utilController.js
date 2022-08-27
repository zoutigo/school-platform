require('dotenv').config()

module.exports.getVariables = async (req, res, next) =>
  res.status(200).send({
    TINYMCE_KEY: process.env.TINYMCE_KEY,
    SITE_ADRESS: process.env.SITE_ADRESS,
    version: '2.0.0',
  })
module.exports.getParameters = async (req, res, next) => {
  const datas = {
    id: 1,
    alias: 'initial',
    addressNumber: '144B',
    addressStreet: 'route de Cremieu',
    addressZipcode: '38230',
    addressCity: 'Tignieu Jameyzieu',
    nbrStudents: 210,
    nbrTeachers: 10,
    nbrFamilies: 350,
    nbrActivities: 600,
    email: 'test@gmail.com',
    phone: '0434512390',
    secret: 'OGEPI-20890',
    schoolYearStartdate: '01/09/2019',
    schoolYearEnddate: '31/06/2020',
    managerMessage: 'hello',
    partner1Name: 'La paroisse Saint Martin',
    partner1Link: 'www.st-martin.com',
    partner2Name: 'La paroisse Saint Martin',
    partner2Link: 'www.st-martin.com',
    partner3Name: 'La paroisse Saint Martin',
    partner3Link: 'www.st-martin.com',
  }

  return res.status(200).send(datas)
}
