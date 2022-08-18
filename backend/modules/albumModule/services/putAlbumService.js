const { album, file, entity } = require('../../../database/models')
const errorLogger = require('../../../utils/errorLogger')

const putAlbumService = async (datas, uuid) => {
  try {
    await album.update(datas, { where: { uuid }, individualHooks: true })

    const updatedAlbum = await album.findOne({
      where: { uuid },
      attributes: { exclude: ['id'] },
      include: [
        {
          model: file,
          paranoid: true,
          attributes: { exclude: ['id'] },
        },
        {
          model: entity,
          paranoid: true,
          attributes: { exclude: ['id'] },
        },
      ],
      paranoid: true,
    })

    return { updatedAlbum, updatedAlbumError: null }
  } catch (error) {
    errorLogger('putAlbumService', error)
    return { updatedAlbum: null, updatedAlbumError: error.message }
  }
}

module.exports = putAlbumService
