const { file, album, entity } = require('../../../database/models')
const storeImageService = require('../../../globalServices/uploads/storeImageService')
const errorLogger = require('../../../utils/errorLogger')

const createAlbumFilesService = async (files, createdAlbum) => {
  try {
    const { uuid } = createdAlbum

    const filesErrors = []

    const images = await Promise.all(
      files.map(async (fil) => {
        const {
          filepath,
          filename,
          error: imgError,
        } = await storeImageService(fil)
        if (imgError) {
          await filesErrors.push(imgError)
        }
        return { filename, filepath }
      })
    )

    if (images.length < 1 || (filesErrors && filesErrors.length > 0))
      return {
        completeAlbum: null,
        completeAlbumError: filesErrors.join() || 'aucune image crée',
      }

    const createdFiles = await Promise.all(
      images.map(async (image) => {
        const newFile = await file.create(image)
        await createdAlbum.addFile(newFile)
        return newFile
      })
    )

    if (createdFiles.length < 1)
      return {
        completeAlbum: null,
        completeAlbumError: 'une erreur est survenue',
      }

    const finalAlbum = await album.findOne({
      where: { uuid },
      paranoid: true,
      include: [
        {
          model: file,
        },
        {
          model: entity,
        },
      ],
    })

    return {
      completeAlbum: finalAlbum,
      completeAlbumError: false,
    }
  } catch (error) {
    errorLogger('createAlbumFilesService', error)
    return {
      completeAlbum: null,
      completeAlbumError: error.message,
    }
  }
}

module.exports = createAlbumFilesService
