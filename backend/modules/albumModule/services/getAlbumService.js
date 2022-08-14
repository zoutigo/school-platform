const { album } = require('../../../database/models')

const getAlbumService = async (uuid) => {
  try {
    const requestedAlbum = await album.findOne({
      where: { uuid },
      attributes: { exclude: ['id'] },
    })

    return { requestedAlbum, requestedAlbumError: false }
  } catch (error) {
    return {
      requestedAlbum: false,
      requestedAlbumError: error,
    }
  }
}

module.exports = getAlbumService
