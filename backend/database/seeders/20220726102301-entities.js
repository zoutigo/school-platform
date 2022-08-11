const { v4: uuidv4 } = require('uuid')

const EntityP = require('../../models/EntityP')

module.exports = {
  async up(queryInterface, Sequelize) {
    const oldEntities = await EntityP.findAll()

    const entities = oldEntities.map(({ dataValues }) => ({
      uuid: uuidv4(),
      name: dataValues.name,
      alias: dataValues.alias,
      email: dataValues.email,
      content: dataValues.content,
      createdAt: dataValues.createdAt,
      updatedAt: dataValues.updatedAt,
    }))

    // await queryInterface.bulkInsert('albums', albums, {})
    await queryInterface.bulkInsert('entities', entities, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('entities', null, {})
  },
}
