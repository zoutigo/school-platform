const dotenv = require('dotenv')
const deleteFilesStorageService = require('../../globalServices/uploads/deleteFilesStorageService')
const errorLogger = require('../../utils/errorLogger')
const { NotFound, BadRequest } = require('../../utils/errors')
const createCardFilesService = require('./services/createCardFilesService')
const createCardService = require('./services/createCardService')
const deleteCardFilesService = require('./services/deleteCardFilesService')
const deleteCardService = require('./services/deleteCardService')
const getCardService = require('./services/getCardService')
const listAlbumsService = require('./services/listCardsService')
const putCardFilesService = require('./services/putCardFilesService')
const putCardService = require('./services/putCardService')

dotenv.config()

module.exports.createCard = async (req, res, next) => {
  try {
    const { createdCard, createdCardError } = await createCardService(req.body)

    if (createdCardError) return next(createdCardError)

    const { completeCard, completeCardError } = await createCardFilesService(
      req.files,
      createdCard
    )

    if (completeCardError)
      return next('erreur lors de la creation des fichiers')

    return res.status(201).send({
      message: 'votre carte a correctement été crée',
      datas: completeCard,
    })
  } catch (error) {
    errorLogger('createCardController', error)

    return next(deleteFilesStorageService(req.files, error))
  }
}
module.exports.getCard = async (req, res, next) => {
  const { uuid } = req.params

  try {
    const { requestedCard, requestedCardError } = await getCardService(uuid)
    if (requestedCardError) return next(requestedCardError)
    if (!requestedCard) return next(new NotFound("Cette carte n'existe pas"))
    return res.status(200).send({
      datas: requestedCard,
    })
  } catch (error) {
    errorLogger('cardController - getCard', error)
    return next(error)
  }
}
module.exports.listCards = async (req, res, next) => {
  try {
    const { cardList, cardListError } = await listAlbumsService()

    if (cardListError) return next(cardListError)
    if (!cardList || cardList.length < 1)
      return next(new NotFound('aucune trouvée'))
    return res.status(200).send({ datas: cardList })
  } catch (error) {
    errorLogger('Cardcontroller - listCards', error)
    return next(error)
  }
}
module.exports.putCard = async (req, res, next) => {
  const { uuid: cardUuid } = req.params
  if (!req.body && !req.files)
    return next(new BadRequest('veiller modidier un champ au moins'))
  const { todeletefilesUuids, ...datas } = req.body

  try {
    let finalCard = null
    const putCardError = {}

    if (req.files) {
      const { updatedFilesCard, updatedFilesCardError } =
        await putCardFilesService(cardUuid, req.files)
      if (updatedFilesCardError) {
        putCardError.files = updatedFilesCardError
      }
      finalCard = updatedFilesCard
    }
    if (datas) {
      const { updatedCard, updatedCardError } = await putCardService(
        datas,
        cardUuid
      )
      putCardError.datas = updatedCardError
      finalCard = updatedCard
    }

    if (todeletefilesUuids) {
      const { deletedFilesCard, deletedFilesCardError } =
        await deleteCardFilesService(cardUuid, todeletefilesUuids)

      putCardError.deletedFiles = deletedFilesCardError
      finalCard = deletedFilesCard
    }
    if (putCardError.datas || putCardError.files || putCardError.deletedFiles) {
      const finalError =
        putCardError.datas || putCardError.files || putCardError.deletedFiles
      return next(finalError)
    }

    if (process.env.NODE_ENV !== 'production')
      return res.status(200).send({
        message: 'la modification a bien été effectuée',
        datas: finalCard,
      })

    return res
      .status(200)
      .send({ message: 'la modification a bien été effectuée' })
  } catch (error) {
    errorLogger('Card Controller - putCard', error)
    return next(error)
  }
}
module.exports.deleteCard = async (req, res, next) => {
  const { uuid } = req.params

  try {
    const { deletedCard, deletedCardError } = await deleteCardService(uuid)

    if (deletedCardError) return next(deletedCardError)
    if (deletedCard !== 1) return next(new NotFound("Cette carte n'existe pas"))
    return res.status(200).send({ message: 'carte correctement supprimé' })
  } catch (error) {
    errorLogger('Card Controller - deletedCard', error)
    return next(error)
  }
}
