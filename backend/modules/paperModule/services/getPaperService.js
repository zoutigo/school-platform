const { paper, file, entity } = require('../../../database/models')
const errorLogger = require('../../../utils/errorLogger')

const getPaperService = async (uuid) => {
  try {
    const requestedPaper = await paper.findOne({
      where: { uuid },
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

    return { requestedPaper, requestedPaperError: false }
  } catch (error) {
    errorLogger('getPaperService', error)
    return {
      requestedPaper: false,
      requestedPaperError: error,
    }
  }
}

module.exports = getPaperService
