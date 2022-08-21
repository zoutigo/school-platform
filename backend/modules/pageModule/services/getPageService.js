const { page } = require('../../../database/models')
const errorLogger = require('../../../utils/errorLogger')

const getPageService = async (uuid) => {
  try {
    const requestedPage = await page.findOne({
      where: { uuid },
      attributes: { exclude: ['id'] },
      paranoid: true,
    })

    return { requestedPage, requestedPageError: false }
  } catch (error) {
    errorLogger('getPageService', error)
    return {
      requestedPage: false,
      requestedPageError: error,
    }
  }
}

module.exports = getPageService
