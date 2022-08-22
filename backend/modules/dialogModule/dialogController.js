const dotenv = require('dotenv')
const errorLogger = require('../../utils/errorLogger')
const { BadRequest, NotFound } = require('../../utils/errors')
const createDialogService = require('./services/createDialogService')
const deleteDialogService = require('./services/deleteDialogService')
const getDialogService = require('./services/getDialogService')
const listDialogsService = require('./services/listDialogsService')
const putDialogService = require('./services/putDialogService')

dotenv.config()

module.exports.createDialog = async (req, res, next) => {
  const datas = req.body

  try {
    const { createdDialog, creatdDialogError } = await createDialogService(
      datas
    )

    if (creatdDialogError) return next(creatdDialogError)

    return res.status(201).send({
      message: 'le dialogue a correctement été crée',
      datas: createdDialog,
    })
  } catch (error) {
    errorLogger('DialogController - createDialog', error)
    return next(error)
  }
}
module.exports.getDialog = async (req, res, next) => {
  const { uuid } = req.params

  try {
    const { requestedDialog, requestedDialogError } = await getDialogService(
      uuid
    )

    if (requestedDialogError) return next(requestedDialogError)
    if (!requestedDialog) return next(new NotFound("Cet dialogue n'existe pas"))
    return res.status(200).send({
      datas: requestedDialog,
    })
  } catch (error) {
    errorLogger('DialogController - getDialog', error)
    return next(error)
  }
}
module.exports.listDialogs = async (req, res, next) => {
  try {
    const { dialogList, dialogListError } = await listDialogsService()

    if (dialogListError) return next(dialogListError)
    if (!dialogList || dialogList.length < 1)
      return next(new NotFound('aucun dialogue trouvé'))
    return res.status(200).send({ datas: dialogList })
  } catch (error) {
    errorLogger('DialogController - listDialog', error)
    return next(error)
  }
}
module.exports.putDialog = async (req, res, next) => {
  const { uuid } = req.params

  if (!req.body)
    return next(new BadRequest('veiller modidier un champ au moins'))

  try {
    const { updatedDialog, updatedDialogError } = await putDialogService(
      req.body,
      uuid
    )

    if (updatedDialogError) return next(updatedDialogError)

    if (process.env.NODE_ENV !== 'production')
      return res.status(200).send({
        message: 'la modification a bien été effectuée',
        datas: updatedDialog,
      })

    return res
      .status(200)
      .send({ message: 'la modification a bien été effectuée' })
  } catch (error) {
    errorLogger('DialogController - putPage', error)
    return next(error)
  }
}
module.exports.deleteDialog = async (req, res, next) => {
  const { uuid } = req.params

  try {
    const { deletedDialog, deletedDialogError } = await deleteDialogService(
      uuid
    )

    if (deletedDialogError) return next(deletedDialogError)
    if (!deletedDialog) return next(new NotFound("Cette page n'existe pas"))
    return res.status(200).send({
      message: 'dialogue correctement supprimé',
      datas: deletedDialog,
    })
  } catch (error) {
    errorLogger('DialogController - deleteDialog', error)

    return next(error)
  }
}
