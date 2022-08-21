const { page } = require('../../../database/models')
const errorLogger = require('../../../utils/errorLogger')

const listPagesService = async () => {
  try {
    const pageList = await page.findAll({
      attributes: { exclude: ['id'] },
      panaroid: true,
    })

    return { pageList, pageListError: false }
  } catch (error) {
    errorLogger('listPagesService', error)
    return {
      pageList: false,
      pageListError: error,
    }
  }
}

module.exports = listPagesService
