const { entity } = require('../../../database/models')

const deleteEntityService = async (uuid) => {
  try {
    const deletedEntity = await entity.destroy({
      where: { uuid },
    })

    return { deletedEntity, deletedEntityError: false }
  } catch (error) {
    return { deletedEntity: null, deletedEntityError: error }
  }
}

module.exports = deleteEntityService
