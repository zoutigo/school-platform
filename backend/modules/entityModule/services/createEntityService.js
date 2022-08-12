const { entity } = require('../../../database/models')

const createEntityService = async (datas) => {
  try {
    // const createdEntity = await entity.build(datas).save()
    const createdEntity = await entity.create(datas, { raw: true })

    const {
      dataValues: { id, ...rest },
    } = createdEntity

    return {
      createdEntity: rest,
      createdEntityError: false,
    }
  } catch (error) {
    return {
      createdEntity: false,
      createdEntityError: error,
    }
  }
}

module.exports = createEntityService
