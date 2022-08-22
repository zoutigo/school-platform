const { dialog } = require('../../../database/models')
const errorLogger = require('../../../utils/errorLogger')

const createDialogService = async (datas) => {
  try {
    const toCreateDialog = await dialog.build(datas).save()

    const createdDialog = await dialog.findOne({
      where: { uuid: toCreateDialog.uuid },
      attributes: { exclude: ['id'] },
      panaroid: true,
    })

    return { createdDialog, creatdDialogError: false }
  } catch (error) {
    errorLogger('createDialogService', error)
    return {
      createdDialog: false,
      creatdDialogError: error,
    }
  }
}

module.exports = createDialogService
