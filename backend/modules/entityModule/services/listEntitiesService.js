const { entity } = require('../../../database/models')

const listEntitiesService = async () => {
  try {
    const entityList = await entity.findAll({
      attributes: { exclude: ['id'] },
    })

    return { entityList, entityListError: false }
  } catch (error) {
    return {
      entityList: false,
      entityListError: error,
    }
  }
}

module.exports = listEntitiesService
