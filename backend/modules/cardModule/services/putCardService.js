const { card, file, entity } = require('../../../database/models')
const errorLogger = require('../../../utils/errorLogger')

const putCardService = async (datas, uuid) => {
  try {
    await card.update(datas, { where: { uuid }, individualHooks: true })

    const updatedCard = await card.findOne({
      where: { uuid },
      attributes: { exclude: ['id'] },
      include: [
        {
          model: file,
          paranoid: true,
          attributes: { exclude: ['id'] },
        },
      ],
      paranoid: true,
    })

    return { updatedCard, updatedCardError: null }
  } catch (error) {
    errorLogger('putCardService', error)
    return { updatedCard: null, updatedCardError: error.message }
  }
}

module.exports = putCardService
