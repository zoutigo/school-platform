const dotenv = require('dotenv')

const { card } = require('../../../database/models')
const errorLogger = require('../../../utils/errorLogger')

dotenv.config()

const createCardService = async (datas) => {
  try {
    const newCard = await card.create(datas)
    const {
      dataValues: { uuid, ...sold },
    } = newCard

    const createdCard = await card.findOne({ where: { uuid } })

    return {
      createdCard,
      createdCardError: false,
    }
  } catch (error) {
    errorLogger('createCardService', error)

    return {
      createdCard: false,
      createdCardError: error,
    }
  }
}

module.exports = createCardService
