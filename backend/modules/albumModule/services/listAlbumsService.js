const { album } = require('../../../database/models')

const listAlbumsService = async () => {
  try {
    const albumList = await album.findAll({
      attributes: { exclude: ['id'] },
    })

    return { albumList, albumListError: false }
  } catch (error) {
    return {
      albumList: false,
      albumListError: error,
    }
  }
}

module.exports = listAlbumsService
