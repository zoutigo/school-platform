const { card, file } = require('../../../database/models')
const errorLogger = require('../../../utils/errorLogger')

const getCardService = async (uuid) => {
  try {
    const requestedCard = await card.findOne({
      where: { uuid },
      attributes: { exclude: ['id'] },
      paranoid: true,
      include: [
        {
          model: file,
          attributes: { exclude: ['id'] },
          paranoid: true,
        },
      ],
    })

    return { requestedCard, requestedCardError: false }
  } catch (error) {
    errorLogger('getCardService', error)
    return {
      requestedCard: false,
      requestedCardError: error,
    }
  }
}

module.exports = getCardService
