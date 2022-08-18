const { album, file, entity } = require('../../../database/models')

const getAlbumService = async (uuid) => {
  try {
    const requestedAlbum = await album.findOne({
      where: { uuid },
      attributes: { exclude: ['id'] },
      paranoid: true,
      include: [
        {
          model: file,
          attributes: { exclude: ['id'] },
          paranoid: true,
        },
        {
          model: entity,
          attributes: { exclude: ['id', 'papers', 'paperid'] },
          paranoid: true,
        },
      ],
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
