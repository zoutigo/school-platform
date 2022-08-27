const dotenv = require('dotenv')
const errorLogger = require('../../utils/errorLogger')
const { BadRequest, NotFound } = require('../../utils/errors')
const createPageService = require('./services/createPageService')
const deletePageservice = require('./services/deletePageService')
const getPageService = require('./services/getPageService')
const listPagesService = require('./services/listPagesService')
const putPageService = require('./services/putPageService')

dotenv.config()

module.exports.createPage = async (req, res, next) => {
  const datas = req.body

  try {
    const { createdPage, createdPageError } = await createPageService(datas)

    if (createdPageError) return next(createdPageError)

    return res.status(201).send({
      message: 'la page a correctement été crée',
      datas: createdPage,
    })
  } catch (error) {
    errorLogger('PageController - createPage', error)
    return next(error)
  }
}
module.exports.getPage = async (req, res, next) => {
  const { uuid } = req.params

  try {
    const { requestedPage, requestedPageError } = await getPageService(uuid)

    if (requestedPageError) return next(requestedPageError)
    if (!requestedPage) return next(new NotFound("Cet role n'existe pas"))
    return res.status(200).send({
      datas: requestedPage,
    })
  } catch (error) {
    errorLogger('PageController - getPage', error)
    return next(error)
  }
}
module.exports.listPages = async (req, res, next) => {
  try {
    const { pageList, pageListError } = await listPagesService(req.query)

    if (pageListError) return next(pageListError)
    if (!pageList || pageList.length < 1)
      return next(new NotFound('aucun role trouvé'))
    return res.status(200).send({ datas: pageList })
  } catch (error) {
    errorLogger('PageController - listPage', error)
    return next(error)
  }
}
module.exports.putPage = async (req, res, next) => {
  const { uuid } = req.params

  if (!req.body)
    return next(new BadRequest('veiller modidier un champ au moins'))

  try {
    const { updatedPage, updatedPageError } = await putPageService(
      req.body,
      uuid
    )

    if (updatedPageError) return next(updatedPageError)

    if (process.env.NODE_ENV !== 'production')
      return res.status(200).send({
        message: 'la modification a bien été effectuée',
        datas: updatedPage,
      })

    return res
      .status(200)
      .send({ message: 'la modification a bien été effectuée' })
  } catch (error) {
    errorLogger('PageController - putPage', error)
    return next(error)
  }
}
module.exports.deletePage = async (req, res, next) => {
  const { uuid } = req.params

  try {
    const { deletedPage, deletedPageError } = await deletePageservice(uuid)

    if (deletedPageError) return next(deletedPageError)
    if (!deletedPage) return next(new NotFound("Cette page n'existe pas"))
    return res.status(200).send({
      message: 'page correctement supprimée',
      datas: deletedPage,
    })
  } catch (error) {
    errorLogger('PageController - deletePage', error)

    return next(error)
  }
}
