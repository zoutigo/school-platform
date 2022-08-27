const { page } = require('../../../database/models')
const errorLogger = require('../../../utils/errorLogger')

const listPagesService = async (params) => {
  const options = {
    attributes: { exclude: ['id'] },
    panaroid: true,
  }
  try {
    const pageList =
      Object.entries(params).length > 0
        ? await page.findAll({
            where: params,
            ...options,
          })
        : await page.findAll(options)

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
