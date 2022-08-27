const { card, file } = require('../../../database/models')
const errorLogger = require('../../../utils/errorLogger')

const listCardsService = async () => {
  try {
    const cardList = await card.findAll({
      attributes: { exclude: ['id'] },
      paranoid: true,
      include: [
        {
          model: file,
          exclude: ['id', 'albumId', 'paperId', 'cardId', 'preinscriptionId'],
          paranoid: true,
        },
      ],
    })

    return { cardList, cardListError: false }
  } catch (error) {
    errorLogger('listCardsService', error)
    return {
      cardList: false,
      cardListError: error,
    }
  }
}

module.exports = listCardsService
