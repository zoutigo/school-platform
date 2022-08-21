const { page } = require('../../../database/models')
const errorLogger = require('../../../utils/errorLogger')

const createPageService = async (datas) => {
  try {
    const toCreatePage = await page.build(datas).save()

    const createdPage = await page.findOne({
      where: { uuid: toCreatePage.uuid },
      attributes: { exclude: ['id'] },
      panaroid: true,
    })

    return { createdPage, createdPageError: false }
  } catch (error) {
    errorLogger('createPageService', error)
    return {
      createdPage: false,
      createdPageError: error,
    }
  }
}

module.exports = createPageService
