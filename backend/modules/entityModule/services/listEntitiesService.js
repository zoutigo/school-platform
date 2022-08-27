const { entity } = require('../../../database/models')
const errorLogger = require('../../../utils/errorLogger')

const listEntitiesService = async (params) => {
  const options = {
    attributes: { exclude: ['id'] },
  }
  try {
    const entityList =
      Object.entries(params).length > 0
        ? await entity.findAll({
            where: params,
            ...options,
          })
        : await entity.findAll(options)

    return { entityList, entityListError: false }
  } catch (error) {
    errorLogger('listEntitiesService', error)
    return {
      entityList: false,
      entityListError: error,
    }
  }
}

module.exports = listEntitiesService
