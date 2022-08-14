const dotenv = require('dotenv')
const { NotFound, BadRequest } = require('../../utils/errors')
const createAlbumService = require('./services/createAlbumService')
const deleteAlbumService = require('./services/deleteAlbumService')
const getAlbumService = require('./services/getAlbumService')
const listAlbumsService = require('./services/listAlbumsService')
const putAlbumService = require('./services/putAlbumService')

dotenv.config()

module.exports.createAlbum = async (req, res, next) => {
  const datas = req.body
  try {
    const { createdAlbum, createdAlbumError } = await createAlbumService(datas)

    if (createdAlbumError) return next(createdAlbumError)

    return res.status(201).send({
      message: 'votre album a correctement été crée',
      datas: createdAlbum,
    })
  } catch (error) {
    return next(error)
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
    return next(error)
  }
}
module.exports.listAlbums = async (req, res, next) => {
  try {
    const { albumList, albumListError } = await listAlbumsService()

    if (albumListError) return next(albumListError)
    if (!albumList || albumList.length < 1)
      return next(new NotFound('aucun album trouvé'))
    return res.status(200).send({ datas: albumList })
  } catch (error) {
    return next(error)
  }
}
module.exports.putAlbum = async (req, res, next) => {
  const { uuid } = req.params
  if (!req.body)
    return next(new BadRequest('veiller modidier un champ au moins'))

  try {
    const { updatedAlbum, updatedAlbumError } = await putAlbumService(
      req.body,
      uuid
    )

    if (updatedAlbumError) return next(updatedAlbumError)

    if (process.env.NODE_ENV !== 'production')
      return res.status(200).send({
        message: 'la modification a bien été effectuée',
        datas: updatedAlbum,
      })

    return res
      .status(200)
      .send({ message: 'la modification a bien été effectuée' })
  } catch (error) {
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
    return next(error)
  }
}
