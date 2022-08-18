const { entity, role } = require('../../../database/models')

const putEntityService = async (datas, entityUuid) => {
  try {
    const { roleUuid, ...rest } = datas

    if (roleUuid) {
      const requestedRole = await role.findOne({ where: { uuid: roleUuid } })
      const requestedEntity = await entity.findOne({
        where: { uuid: entityUuid },
      })
      await requestedEntity.addRole(requestedRole)
    }

    if (rest) {
      await entity.update(rest, {
        where: { uuid: entityUuid },
        individualHooks: true,
      })
    }

    const updatedEntity = await entity.findOne({
      where: { uuid: entityUuid },
      // attributes: { exclude: ['id'] },
      include: [{ model: role, exclude: ['id'] }],
      nest: true,
      raw: true,
    })

    return { updatedEntity, updatedEntityError: false }
  } catch (error) {
    console.log('error:', error)
    return { updatedEntity: null, updatedEntityError: error.message }
  }
}

module.exports = putEntityService
