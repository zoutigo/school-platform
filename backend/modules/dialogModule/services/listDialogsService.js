const { dialog } = require('../../../database/models')
const errorLogger = require('../../../utils/errorLogger')

const listDialogsService = async () => {
  try {
    const dialogList = await dialog.findAll({
      attributes: { exclude: ['id'] },
      panaroid: true,
    })

    return { dialogList, dialogLisError: false }
  } catch (error) {
    errorLogger('listDialogsService', error)
    return {
      dialogList: false,
      dialogLisError: error,
    }
  }
}

module.exports = listDialogsService
