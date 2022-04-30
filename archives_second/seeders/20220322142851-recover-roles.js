const { QueryTypes } = require('@sequelize/core')
const EntityP = require('../../models/EntityP')
const RoleP = require('../../models/RoleP')

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()

    const oldRoles = await RoleP.findAll()
    const newEntities = await queryInterface.sequelize.query(
      ` SELECT * FROM entities`,
      {
        type: QueryTypes.SELECT,
      }
    )

    const oldEntities = await EntityP.findAll()

    const roles = oldRoles.map((role) => {
      const oldEntity = oldEntities.find(
        (entity) => entity.id === role.entityId
      )
      const newEntity = newEntities.find(
        (entity) => entity.alias === oldEntity.alias
      )
      return {
        name: role.name,
        mission: role.mission,
        entityId: newEntity.id,
        createdAt: role.createdAt,
        updatedAt: role.updatedAt,
      }
    })

    await queryInterface.bulkInsert('roles', roles, { transaction })

    await transaction.commit()
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('roles', null, {})
  },
}
