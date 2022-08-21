const { card, file } = require('../../../database/models')
const errorLogger = require('../../../utils/errorLogger')
const createCardFilesService = require('./createCardFilesService')

const putCardFilesService = async (cardUuid, files) => {
  try {
    const toUpdateCard = await card.findOne({ where: { uuid: cardUuid } })

    if (files && files.length > 0) {
      const { completeCard, completeCardError } = await createCardFilesService(
        files,
        toUpdateCard
      )
      return {
        updatedFilesCard: completeCard,
        updatedFilesCardError: completeCardError,
      }
    }

    const updatedFilesCard = await card.findOne({
      where: { uuid: cardUuid },
      include: [
        {
          model: file,
          attributes: { exclude: ['id'] },
          paranoid: true,
        },
      ],
      paranoid: true,
    })

    return {
      updatedFilesCard,
      updatedFilesCardError: null,
    }
  } catch (error) {
    errorLogger('putCardFilesService', error)
    return {
      updatedFilesCard: null,
      updatedFilesCardError: error,
    }
  }
}

module.exports = putCardFilesService
