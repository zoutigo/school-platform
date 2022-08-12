const { entity } = require('../../../database/models')

const getEntityService = async (uuid) => {
  try {
    const requestedEntity = await entity.findOne({
      where: { uuid },
      attributes: { exclude: ['id'] },
    })

    return { requestedEntity, requestedEntityError: false }
  } catch (error) {
    return {
      requestedEntity: false,
      requestedEntityError: error,
    }
  }
}

module.exports = getEntityService
