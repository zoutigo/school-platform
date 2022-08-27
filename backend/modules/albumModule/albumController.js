const dotenv = require('dotenv')
const deleteFilesStorageService = require('../../globalServices/uploads/deleteFilesStorageService')
const errorLogger = require('../../utils/errorLogger')
const { NotFound, BadRequest } = require('../../utils/errors')
const createAlbumFilesService = require('./services/createAlbumFilesService')
const createAlbumService = require('./services/createAlbumService')
const deleteAlbumFilesService = require('./services/deleteAlbumFilesService')
const deleteAlbumService = require('./services/deleteAlbumService')
const getAlbumService = require('./services/getAlbumService')
const listAlbumsService = require('./services/listAlbumsService')
const putAlbumFilesService = require('./services/putAlbumFilesService')
const putAlbumService = require('./services/putAlbumService')

dotenv.config()

module.exports.createAlbum = async (req, res, next) => {
  try {
    const { createdAlbum, createdAlbumError } = await createAlbumService(
      req.body
    )

    if (createdAlbumError) return next(createdAlbumError)

    const { completeAlbum, completeAlbumError } = await createAlbumFilesService(
      req.files,
      createdAlbum
    )

    if (completeAlbumError)
      return next('erreur lors de la creation des fichiers')

    return res.status(201).send({
      message: 'votre album a correctement été crée',
      datas: completeAlbum,
    })
  } catch (error) {
    errorLogger('createAlbumController', error)

    return next(deleteFilesStorageService(req.files, error))
  }
}
module.exports.getAlbum = async (req, res, next) => {
  const { uuid } = req.params

  try {
    const { requestedAlbum, requestedAlbumError } = await getAlbumService(uuid)
    if (requestedAlbumError) return next(requestedAlbumError)
    if (!requestedAlbum) return next(new NotFound("Cet album n'existe pas"))
    return res.status(200).send({
      datas: requestedAlbum,
    })
  } catch (error) {
    errorLogger('albumController - getAlbum')
    return next(error)
  }
}
module.exports.listAlbums = async (req, res, next) => {
  try {
    const { albumList, albumListError } = await listAlbumsService(req.query)

    if (albumListError) return next(albumListError)
    if (!albumList || albumList.length < 1)
      return next(new NotFound('aucun album trouvé'))
    return res.status(200).send({ datas: albumList })
  } catch (error) {
    errorLogger('albumcontroller - listAlbums')
    return next(error)
  }
}
module.exports.putAlbum = async (req, res, next) => {
  const { uuid: albumUuid } = req.params
  if (!req.body && !req.files)
    return next(new BadRequest('veiller modidier un champ au moins'))
  const { todeletefilesUuids, ...datas } = req.body

  try {
    let finalAlbum = null
    const putAlbumError = {}

    if (req.files) {
      const { updatedFilesAlbum, updatedFilesAlbumError } =
        await putAlbumFilesService(albumUuid, req.files)
      if (updatedFilesAlbumError) {
        putAlbumError.files = updatedFilesAlbumError
      }
      finalAlbum = updatedFilesAlbum
    }
    if (datas) {
      const { updatedAlbum, updatedAlbumError } = await putAlbumService(
        datas,
        albumUuid
      )
      putAlbumError.datas = updatedAlbumError
      finalAlbum = updatedAlbum
    }

    if (todeletefilesUuids) {
      const { deletedFilesAlbum, deletedFilesAlbumError } =
        await deleteAlbumFilesService(albumUuid, todeletefilesUuids)

      putAlbumError.deletedFiles = deletedFilesAlbumError
      finalAlbum = deletedFilesAlbum
    }
    if (
      putAlbumError.datas ||
      putAlbumError.files ||
      putAlbumError.deletedFiles
    ) {
      const finalError =
        putAlbumError.datas || putAlbumError.files || putAlbumError.deletedFiles
      return next(finalError)
    }

    if (process.env.NODE_ENV !== 'production')
      return res.status(200).send({
        message: 'la modification a bien été effectuée',
        datas: finalAlbum,
      })

    return res
      .status(200)
      .send({ message: 'la modification a bien été effectuée' })
  } catch (error) {
    errorLogger('Album Controller - putAlbum', error)
    return next(error)
  }
}
module.exports.deleteAlbum = async (req, res, next) => {
  const { uuid } = req.params

  try {
    const { deletedAlbum, deletedAlbumError } = await deleteAlbumService(uuid)

    if (deletedAlbumError) return next(deletedAlbumError)
    if (deletedAlbum !== 1) return next(new NotFound("Cet album n'existe pas"))
    return res.status(200).send({ message: 'album correctement supprimé' })
  } catch (error) {
    errorLogger('Album Controller - deleteAlbum', error)
    return next(error)
  }
}
