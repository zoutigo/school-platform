const { paper, file, entity } = require('../../../database/models')
const errorLogger = require('../../../utils/errorLogger')

const putPaperService = async (datas, uuid) => {
  try {
    await paper.update(datas, { where: { uuid }, individualHooks: true })

    const updatedPaper = await paper.findOne({
      where: { uuid },
      attributes: { exclude: ['id'] },
      include: [
        {
          model: file,
          paranoid: true,
          attributes: { exclude: ['id'] },
        },
        {
          model: entity,
          paranoid: true,
          attributes: { exclude: ['id'] },
        },
      ],
      paranoid: true,
    })

    return { updatedPaper, updatedPaperError: null }
  } catch (error) {
    errorLogger('putPaperService', error)
    return { updatedPaper: null, updatedPaperError: error.message }
  }
}

module.exports = putPaperService
