const { album, file, entity } = require('../../../database/models')

const listAlbumsService = async () => {
  try {
    const albumList = await album.findAll({
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

    return { albumList, albumListError: false }
  } catch (error) {
    return {
      albumList: false,
      albumListError: error,
    }
  }
}

module.exports = listAlbumsService
