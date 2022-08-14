const { album } = require('../../../database/models')

const createAlbumService = async (datas) => {
  try {
    // const createdAlbum = await album.build(datas).save()
    const createdAlbum = await album.create(datas)

    const {
      dataValues: { id, ...rest },
    } = createdAlbum

    return {
      createdAlbum: rest,
      createdAlbumError: false,
    }
  } catch (error) {
    return {
      createdAlbum: false,
      createdAlbumError: error,
    }
  }
}

module.exports = createAlbumService
