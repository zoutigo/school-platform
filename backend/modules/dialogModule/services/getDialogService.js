const { dialog } = require('../../../database/models')
const errorLogger = require('../../../utils/errorLogger')

const getDialogService = async (uuid) => {
  try {
    const requestedDialog = await dialog.findOne({
      where: { uuid },
      attributes: { exclude: ['id'] },
      paranoid: true,
    })

    return { requestedDialog, requestedDialogError: false }
  } catch (error) {
    errorLogger('getDialogService', error)
    return {
      requestedDialog: false,
      requestedDialogError: error,
    }
  }
}

module.exports = getDialogService
