const { entity } = require('../../../database/models')

const putEntityService = async (datas, uuid) => {
  try {
    await entity.update(datas, { where: { uuid }, individualHooks: true })

    const updatedEntity = await entity.findOne({
      where: { uuid },
      attributes: { exclude: ['id'] },
    })

    return { updatedEntity, updatedEntityError: false }
  } catch (error) {
    return { updatedEntity: null, updatedEntityError: error }
  }
}

module.exports = putEntityService
