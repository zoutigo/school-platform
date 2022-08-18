const { album, file, entity } = require('../../../database/models')
const errorLogger = require('../../../utils/errorLogger')

const deleteAlbumFilesService = async (albumUuid, todeletefilesUuids) => {
  try {
    const toUpdateAlbum = await album.findOne({
      where: { uuid: albumUuid },
      paranoid: true,
    })

    const destroyedFiles = await Promise.all(
      todeletefilesUuids.map(async (fileUuid) => {
        const toDeleteFile = await file.findOne({ where: { uuid: fileUuid } })
        await toUpdateAlbum.removeFile(toDeleteFile)
        const deletedFile = await toDeleteFile.destroy()
        return deletedFile
      })
    )

    if (destroyedFiles.length < 1)
      return {
        deletedFilesAlbum: null,
        deletedFilesAlbumError:
          'une erreur est survenue lors de la destruction des fichiers en base de donnée',
      }

    const deletedFilesAlbum = await album.findOne({
      where: { uuid: albumUuid },
      include: [
        {
          model: entity,
          attributes: { exclude: ['id'] },
          paranoid: false,
        },
        {
          model: file,
          attributes: { exclude: ['id'] },
          paranoid: false,
        },
      ],
      paranoid: false,
    })
    return {
      deletedFilesAlbum,
      deletedFilesAlbumError: null,
    }
  } catch (error) {
    errorLogger('deleteAlbumFilesService', error)
    return {
      deletedFilesAlbum: null,
      deletedFilesAlbumError: error.message,
    }
  }
}

module.exports = deleteAlbumFilesService
