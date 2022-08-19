const { file, paper, entity } = require('../../../database/models')
const errorLogger = require('../../../utils/errorLogger')

const createPaperFilesService = async (files, createdPaper) => {
  try {
    const { uuid } = createdPaper

    const createdFiles = await Promise.all(
      files.map(async ({ destination, filename, mimetype, size }) => {
        const newFile = await file.create({ filepath: destination, filename })
        await createdPaper.addFile(newFile)
        return newFile
      })
    )

    if (!createdFiles.length > 0)
      return {
        completePaper: null,
        completePaperError: 'une erreur est survenue',
      }

    const finalPaper = await paper.findOne({
      where: { uuid },
      paranoid: true,
      attributes: { exclude: ['id'] },
      include: [
        {
          model: entity,
          paranoid: true,
          attributes: { exclude: ['id'] },
        },
        {
          model: file,
          paranoid: true,
          attributes: { exclude: ['id'] },
        },
      ],
    })

    return {
      completePaper: finalPaper,
      completePaperError: false,
    }
  } catch (error) {
    errorLogger('createPaperFilesService', error)
    return {
      completePaper: null,
      completePaperError: error.message,
    }
  }
}

module.exports = createPaperFilesService
