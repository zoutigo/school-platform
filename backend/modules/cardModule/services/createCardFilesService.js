const { file, card } = require('../../../database/models')
const storeImageService = require('../../../globalServices/uploads/storeImageService')
const errorLogger = require('../../../utils/errorLogger')

const createCardFilesService = async (files, createdCard) => {
  try {
    const { uuid } = createdCard

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
        completeCard: null,
        completeCardError: filesErrors.join() || 'aucune image crée',
      }

    const createdFiles = await Promise.all(
      images.map(async (image) => {
        const newFile = await file.create(image)
        await createdCard.addFile(newFile)
        return newFile
      })
    )

    if (createdFiles.length < 1)
      return {
        completeCard: null,
        completeCardError: 'une erreur est survenue',
      }

    const finalCard = await card.findOne({
      where: { uuid },
      paranoid: true,
      include: [
        {
          model: file,
        },
      ],
    })

    return {
      completeCard: finalCard,
      completeCardError: false,
    }
  } catch (error) {
    errorLogger('createCardFilesService', error)
    return {
      completeCard: null,
      completeCardError: error.message,
    }
  }
}

module.exports = createCardFilesService
