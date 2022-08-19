const { paper, file, entity } = require('../../../database/models')
const errorLogger = require('../../../utils/errorLogger')
const createPaperFilesService = require('./createPaperFilesService')

const putPaperFilesService = async (paperUuid, files) => {
  try {
    const toUpdatePaper = await paper.findOne({ where: { uuid: paperUuid } })

    if (files && files.length > 0) {
      const { completePaper, completePaperError } =
        await createPaperFilesService(files, toUpdatePaper)
      return {
        updatedFilesPaper: completePaper,
        updatedFilesPaperError: completePaperError,
      }
    }

    const updatedFilesPaper = await paper.findOne({
      where: { uuid: paperUuid },
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
      updatedFilesPaper,
      updatedFilesPaperError: null,
    }
  } catch (error) {
    errorLogger('putPaperFilesService', error)
    return {
      updatedFilesPaper: null,
      updatedFilesPaperError: error,
    }
  }
}

module.exports = putPaperFilesService
