const { page } = require('../../../database/models')
const errorLogger = require('../../../utils/errorLogger')

const deletePageService = async (uuid) => {
  try {
    const deletedPage = await page.destroy({
      where: { uuid },
    })

    return { deletedPage, deletedPageError: false }
  } catch (error) {
    errorLogger('deletePageService', error)
    return { deletedPage: null, deletedPageError: error }
  }
}

module.exports = deletePageService
