const EntityP = require('../../models/EntityP')

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()

    const oldEntities = await EntityP.findAll()

    const entities = oldEntities.map((entity) => ({
      name: entity.name,
      alias: entity.alias,
      content: entity.content,
      email: entity.email,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    }))

    await queryInterface.bulkInsert('entities', entities, { transaction })

    await transaction.commit()
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('entities', null, {})
  },
}
