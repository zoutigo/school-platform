const { paper } = require('../../../database/models')
const errorLogger = require('../../../utils/errorLogger')

const deletePaperService = async (uuid) => {
  console.log('hello-------------')
  try {
    const deletedPaper = await paper.destroy({
      where: { uuid },
    })

    return { deletedPaper, deletedPaperError: false }
  } catch (error) {
    errorLogger('deletePaperService', error)
    return { deletedPaper: null, deletedPaperError: error }
  }
}

module.exports = deletePaperService
