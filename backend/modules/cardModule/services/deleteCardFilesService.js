const { card, file, entity } = require('../../../database/models')
const errorLogger = require('../../../utils/errorLogger')

const deleteCardFilesService = async (cardUuid, todeletefilesUuids) => {
  try {
    const toUpdateCard = await card.findOne({
      where: { uuid: cardUuid },
      paranoid: true,
    })

    const destroyedFiles = await Promise.all(
      todeletefilesUuids.map(async (fileUuid) => {
        const toDeleteFile = await file.findOne({ where: { uuid: fileUuid } })
        await toUpdateCard.removeFile(toDeleteFile)
        const deletedFile = await toDeleteFile.destroy()
        return deletedFile
      })
    )

    if (destroyedFiles.length < 1)
      return {
        deletedFilesCard: null,
        deletedFilesCardError:
          'une erreur est survenue lors de la destruction des fichiers en base de donnée',
      }

    const deletedFilesCard = await card.findOne({
      where: { uuid: cardUuid },
      include: [
        {
          model: file,
          attributes: { exclude: ['id'] },
          paranoid: false,
        },
      ],
      paranoid: false,
    })
    return {
      deletedFilesCard,
      deletedFilesCardError: null,
    }
  } catch (error) {
    errorLogger('deleteCardFilesService', error)
    return {
      deletedFilesCard: null,
      deletedFilesCardError: error.message,
    }
  }
}

module.exports = deleteCardFilesService
