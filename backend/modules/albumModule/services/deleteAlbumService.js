const { album } = require('../../../database/models')

const deleteAlbumService = async (uuid) => {
  try {
    const deletedAlbum = await album.destroy({
      where: { uuid },
    })

    return { deletedAlbum, deletedAlbumError: false }
  } catch (error) {
    return { deletedAlbum: null, deletedAlbumError: error }
  }
}

module.exports = deleteAlbumService
