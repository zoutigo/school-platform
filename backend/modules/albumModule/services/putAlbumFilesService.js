const { album, file, entity } = require('../../../database/models')
const errorLogger = require('../../../utils/errorLogger')
const createAlbumFilesService = require('./createAlbumFilesService')

const putAlbumFilesService = async (albumUuid, files) => {
  try {
    const toUpdateAlbum = await album.findOne({ where: { uuid: albumUuid } })

    if (files && files.length > 0) {
      const { completeAlbum, completeAlbumError } =
        await createAlbumFilesService(files, toUpdateAlbum)
      return {
        updatedFilesAlbum: completeAlbum,
        updatedFilesAlbumError: completeAlbumError,
      }
    }

    const updatedFilesAlbum = await album.findOne({
      where: { uuid: albumUuid },
      include: [
        {
          model: entity,
          attributes: { exclude: ['id'] },
          paranoid: true,
        },
        {
          model: file,
          attributes: { exclude: ['id'] },
          paranoid: true,
        },
      ],
      paranoid: true,
    })

    return {
      updatedFilesAlbum,
      updatedFilesAlbumError: null,
    }
  } catch (error) {
    errorLogger('putAlbumFilesService', error)
    return {
      updatedFilesAlbum: null,
      updatedFilesAlbumError: error,
    }
  }
}

module.exports = putAlbumFilesService
