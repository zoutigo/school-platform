const { paper, file, entity } = require('../../../database/models')
const errorLogger = require('../../../utils/errorLogger')

const deletePaperFilesService = async (paperUuid, todeletefilesUuids) => {
  try {
    const toUpdatePaper = await paper.findOne({
      where: { uuid: paperUuid },
      paranoid: true,
    })

    const destroyedFiles = await Promise.all(
      todeletefilesUuids.map(async (fileUuid) => {
        const toDeleteFile = await file.findOne({ where: { uuid: fileUuid } })
        await toUpdatePaper.removeFile(toDeleteFile)
        const deletedFile = await toDeleteFile.destroy()
        return deletedFile
      })
    )

    if (destroyedFiles.length < 1)
      return {
        deletedFilesPaper: null,
        deletedFilesPaperError:
          'une erreur est survenue lors de la destruction des fichiers en base de donnée',
      }

    const deletedFilesPaper = await paper.findOne({
      where: { uuid: paperUuid },
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
      deletedFilesPaper,
      deletedFilesPaperError: null,
    }
  } catch (error) {
    errorLogger('deletePaperFilesService', error)
    return {
      deletedFilesPaper: null,
      deletedFilesPaperError: error.message,
    }
  }
}

module.exports = deletePaperFilesService
