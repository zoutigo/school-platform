const { album } = require('../../../database/models')

const putAlbumService = async (datas, uuid) => {
  try {
    await album.update(datas, { where: { uuid }, individualHooks: true })

    const updatedAlbum = await album.findOne({
      where: { uuid },
      attributes: { exclude: ['id'] },
    })

    return { updatedAlbum, updatedAlbumError: false }
  } catch (error) {
    return { updatedAlbum: null, updatedAlbumError: error }
  }
}

module.exports = putAlbumService
