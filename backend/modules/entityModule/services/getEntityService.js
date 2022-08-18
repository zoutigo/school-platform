const { entity, role } = require('../../../database/models')

const getEntityService = async (uuid) => {
  try {
    const requestedEntity = await entity.findOne({
      where: { uuid },
      attributes: { exclude: ['id'] },
      include: [
        {
          model: role,
          attributes: ['uuid', 'name', 'slug'],
        },
      ],
    })

    return { requestedEntity, requestedEntityError: false }
  } catch (error) {
    console.log('error', error.message)
    return {
      requestedEntity: false,
      requestedEntityError: error.message,
    }
  }
}

module.exports = getEntityService
