const { card } = require('../../../database/models')
const errorLogger = require('../../../utils/errorLogger')

const deleteCardService = async (uuid) => {
  try {
    const deletedCard = await card.destroy({
      where: { uuid },
    })

    return { deletedCard, deletedCardError: false }
  } catch (error) {
    errorLogger('deleteCardService', error)
    return { deletedCard: null, deletedCardError: error }
  }
}

module.exports = deleteCardService
