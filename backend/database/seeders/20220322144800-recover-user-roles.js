const { QueryTypes } = require('@sequelize/core')
const { User, Role, Entity } = require('../models')
const UserP = require('../../models/UserP')
const RoleP = require('../../models/RoleP')
const EntityP = require('../../models/EntityP')

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    const newUsers = await User.findAll()

    const newRoles = await queryInterface.sequelize.query(
      ` SELECT * FROM roles`,
      {
        type: QueryTypes.SELECT,
      }
    )

    const oldUsers = await UserP.findAll({
      include: [{ model: RoleP }],
    })

    const newEntities = await Entity.findAll()
    const oldEntities = await EntityP.findAll()

    const getNewEntityId = (oldEntityId) => {
      const oldEntity = oldEntities.find((entity) => oldEntityId === entity.id)
      const newEntity = newEntities.find(
        (entity) => entity.alias === oldEntity.alias
      )
      return newEntity.id
    }

    const userRoles = []

    oldUsers.forEach((oldUser) => {
      const { email, roles } = oldUser
      if (roles.length > 0) {
        const newUser = newUsers.find((user) => user.email === email)
        roles.forEach((role) => {
          const { entityId } = role
          const newRole = newRoles.find(
            (rol) => rol.entityId === getNewEntityId(entityId)
          )
          userRoles.push({
            userId: newUser.id,
            roleId: newRole.id,
            createdAt: new Date(),
            updatedAt: new Date(),
          })
        })
      }
    })

    if (userRoles.length) {
      await queryInterface.bulkInsert('user_roles', userRoles, { transaction })
    }

    await transaction.commit()
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user_roles', null, {})
  },
}
