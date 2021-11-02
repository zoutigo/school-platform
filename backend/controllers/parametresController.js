const { Unauthorized, BadRequest, NotFound } = require('../utils/errors')

module.exports.postParametres = async (req, res, next) => {}
module.exports.getParametres = async (req, res, next) => {
  const datas = [
    {
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
    },
  ]
  const { alias } = req.query

  if (!alias) return next(new BadRequest('alias is missing in the request'))
  const [result] = datas.filter((data) => data.alias === req.query.alias)

  if (!result) return next(new BadRequest('pas de parametres pour cet alias'))
  return res.status(200).send(result)
}
