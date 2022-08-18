const dotenv = require('dotenv')

const { album, entity } = require('../../../database/models')
const errorLogger = require('../../../utils/errorLogger')

dotenv.config()

const createAlbumService = async (datas) => {
  const { entityUuid, ...rest } = datas

  try {
    const newAlbum = await album.create(rest)
    const {
      dataValues: { uuid, ...sold },
    } = newAlbum
    const albumEntity = await entity.findOne({
      where: { uuid: entityUuid },
      paranoid: true,
    })

    await newAlbum.setEntity(albumEntity)

    const createdAlbum = await album.findOne({ where: { uuid } })

    return {
      createdAlbum,
      createdAlbumError: false,
    }
  } catch (error) {
    errorLogger('createAlbumService', error)

    return {
      createdAlbum: false,
      createdAlbumError: error,
    }
  }
}

module.exports = createAlbumService
