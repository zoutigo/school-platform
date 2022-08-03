const { QueryTypes } = require('@sequelize/core')
const { v4: uuidv4 } = require('uuid')

const EntityP = require('../../models/EntityP')
const UserEntities = require('../../models/UserEntities')
const UserP = require('../../models/UserP')

module.exports = {
  async up(queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction()

    try {
      const entities = await queryInterface.sequelize.query(
        ` SELECT * FROM entities`,
        {
          type: QueryTypes.SELECT,
        }
      )
      const users = await queryInterface.sequelize.query(
        ` SELECT * FROM users`,
        {
          type: QueryTypes.SELECT,
        }
      )
      const oldUserEntities = await UserEntities.findAll()

      const userEntities = await Promise.all(
        oldUserEntities.map(async (oldUserEntity) => {
          const { entityId, userId } = oldUserEntity

          const oldEntity = await EntityP.findOne({
            where: { id: entityId },
          })
          const newEntity = entities.find((e) => e.alias === oldEntity.alias)

          const oldUser = await UserP.findOne({
            where: { id: userId },
          })
          const newUser = users.find((e) => e.email === oldUser.email)

          return {
            uuid: uuidv4(),
            entityId: newEntity.id,
            userId: newUser.id,
            createdAt: new Date(),
            updatedAt: new Date(),
          }
        })
      )
      await queryInterface.bulkInsert('user_entities', userEntities, { t })

      await t.commit()
    } catch (error) {
      console.log('err', error)
      await t.rollback()
    }
  },

  async down(queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction()

    try {
      await queryInterface.bulkDelete('user_entities', null, { t })
      await t.commit()
    } catch (error) {
      await t.rollback()
    }
  },
}
