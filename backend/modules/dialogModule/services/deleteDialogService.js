const { dialog } = require('../../../database/models')
const errorLogger = require('../../../utils/errorLogger')

const deleteDialogService = async (uuid) => {
  try {
    const deletedDialog = await dialog.destroy({
      where: { uuid },
    })

    return { deletedDialog, deletedDialogError: false }
  } catch (error) {
    errorLogger('deleteDialogService', error)
    return { deletedDialog: null, deletedDialogError: error }
  }
}

module.exports = deleteDialogService
