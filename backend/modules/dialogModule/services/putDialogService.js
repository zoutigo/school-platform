const { dialog } = require('../../../database/models')
const errorLogger = require('../../../utils/errorLogger')

const putDialogService = async (datas, uuid) => {
  try {
    await dialog.update(
      { ...datas },
      { where: { uuid }, individualHooks: true }
    )

    const updatedDialog = await dialog.findOne({
      where: { uuid },
      attributes: { exclude: ['id'] },
    })

    return { updatedDialog, updatedDialogError: false }
  } catch (error) {
    errorLogger('putDialogService', error)
    return { updatedDialog: null, updatedDialogError: error }
  }
}

module.exports = putDialogService
