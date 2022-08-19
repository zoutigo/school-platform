const dotenv = require('dotenv')
const deleteFilesStorageService = require('../../globalServices/uploads/deleteFilesStorageService')
const errorLogger = require('../../utils/errorLogger')
const { NotFound, BadRequest } = require('../../utils/errors')
const createPaperFilesService = require('./services/createPaperFilesService')
const createPaperService = require('./services/createPaperService')
const deletePaperFilesService = require('./services/deletePaperFilesService')
const deletePaperService = require('./services/deletePaperService')
const getPaperService = require('./services/getPaperService')
const listPapersService = require('./services/listPapersService')
const putPaperFilesService = require('./services/putPaperFilesService')
const putPaperService = require('./services/putPaperService')

dotenv.config()

module.exports.createPaper = async (req, res, next) => {
  try {
    const { createdPaper, createdPaperError } = await createPaperService(
      req.body
    )

    if (createdPaperError) return next(createdPaperError)

    const { completePaper, completePaperError } = await createPaperFilesService(
      req.files,
      createdPaper
    )

    if (completePaperError)
      return next('erreur lors de la creation des fichiers')

    return res.status(201).send({
      message: 'votre papier a correctement été crée',
      datas: completePaper,
    })
  } catch (error) {
    errorLogger('createAlbumController', error)

    return next(deleteFilesStorageService(req.files, error))
  }
}
module.exports.getPaper = async (req, res, next) => {
  const { uuid } = req.params

  try {
    const { requestedPaper, requestedPaperError } = await getPaperService(uuid)
    if (requestedPaperError) return next(requestedPaperError)
    if (!requestedPaper) return next(new NotFound("Ce papier n'existe pas"))
    return res.status(200).send({
      datas: requestedPaper,
    })
  } catch (error) {
    errorLogger('paperController - getPaper')
    return next(error)
  }
}
module.exports.listPapers = async (req, res, next) => {
  try {
    const { paperList, paperListError } = await listPapersService()

    if (paperListError) return next(paperListError)
    if (!paperList || paperList.length < 1)
      return next(new NotFound('aucun papier trouvé'))
    return res.status(200).send({ datas: paperList })
  } catch (error) {
    errorLogger('paperController - listPapers')
    return next(error)
  }
}
module.exports.putPaper = async (req, res, next) => {
  const { uuid: paperUuid } = req.params
  if (!req.body && !req.files)
    return next(new BadRequest('veiller modidier un champ au moins'))
  const { todeletefilesUuids, ...datas } = req.body

  try {
    let finalPaper = null
    const putPaperError = {}

    if (req.files) {
      const { updatedFilesPaper, updatedFilesPaperError } =
        await putPaperFilesService(paperUuid, req.files)
      if (updatedFilesPaperError) {
        putPaperError.files = updatedFilesPaperError
      }
      finalPaper = updatedFilesPaper
    }
    if (datas) {
      const { updatedPaper, updatedPaperError } = await putPaperService(
        datas,
        paperUuid
      )
      putPaperError.datas = updatedPaperError
      finalPaper = updatedPaper
    }

    if (todeletefilesUuids) {
      const { deletedFilesPaper, deletedFilesPaperError } =
        await deletePaperFilesService(paperUuid, todeletefilesUuids)

      putPaperError.deletedFiles = deletedFilesPaperError
      finalPaper = deletedFilesPaper
    }
    if (
      putPaperError.datas ||
      putPaperError.files ||
      putPaperError.deletedFiles
    ) {
      const finalError =
        putPaperError.datas || putPaperError.files || putPaperError.deletedFiles
      return next(finalError)
    }

    if (process.env.NODE_ENV !== 'production')
      return res.status(200).send({
        message: 'la modification a bien été effectuée',
        datas: finalPaper,
      })

    return res
      .status(200)
      .send({ message: 'la modification a bien été effectuée' })
  } catch (error) {
    errorLogger('Paper Controller - putPaper', error)
    return next(error)
  }
}
module.exports.deletePaper = async (req, res, next) => {
  const { uuid } = req.params

  try {
    const { deletedPaper, deletedPaperError } = await deletePaperService(uuid)

    if (deletedPaperError) return next(deletedPaperError)
    if (deletedPaper !== 1) return next(new NotFound("Cet papier n'existe pas"))
    return res.status(200).send({ message: 'papier correctement supprimé' })
  } catch (error) {
    errorLogger('Paper Controller - deletedPaper', error)
    return next(error)
  }
}
