const { page } = require('../../../database/models')

const putPageService = async (datas, uuid) => {
  try {
    await page.update({ ...datas }, { where: { uuid }, individualHooks: true })

    const updatedPage = await page.findOne({
      where: { uuid },
      attributes: { exclude: ['id'] },
    })

    return { updatedPage, updatedPageError: false }
  } catch (error) {
    return { updatedPage: null, updatedPageError: error }
  }
}

module.exports = putPageService
