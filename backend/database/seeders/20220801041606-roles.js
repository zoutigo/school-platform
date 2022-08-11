// const UserRoles = require('../../models/UserRoles')
const { v4: uuidv4 } = require('uuid')
const rawRoles = require('../../constants/rawRoles')

module.exports = {
  async up(queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction()

    try {
      const roles = rawRoles.map((role) => ({
        ...role,
        uuid: uuidv4(),
        createdAt: new Date(),
        updatedAt: new Date(),
      }))

      await queryInterface.bulkInsert('roles', roles, { t })
      await t.commit()
    } catch (error) {
      await t.rollback()
      throw error
    }
  },

  async down(queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.bulkDelete('roles', null, { t })
      await t.commit()
    } catch (error) {
      await t.rollback()
      throw error
    }
  },
}
