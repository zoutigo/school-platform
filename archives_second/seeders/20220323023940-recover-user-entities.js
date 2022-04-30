const { User, Entity } = require('../models')
const UserP = require('../../models/UserP')
const EntityP = require('../../models/EntityP')

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    const newUsers = await User.findAll()

    const oldUsers = await UserP.findAll({
      include: [{ model: EntityP }],
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

    const usersEntities = []

    oldUsers.forEach((oldUser) => {
      const { email, entities } = oldUser
      if (entities.length > 0) {
        const newUser = newUsers.find((user) => user.email === email)
        entities.forEach((entity) => {
          usersEntities.push({
            userId: newUser.id,
            entityId: getNewEntityId(entity.id),
            createdAt: new Date(),
            updatedAt: new Date(),
          })
        })
      }
    })

    if (usersEntities.length) {
      await queryInterface.bulkInsert('user_entities', usersEntities, {
        transaction,
      })
    }

    await transaction.commit()
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user_entities', null, {})
  },
}
