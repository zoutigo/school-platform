const { v4: uuidv4 } = require('uuid')

const EntityP = require('../../models/EntityP')

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

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
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    // await queryInterface.bulkDelete('albums', null, {})
    await queryInterface.bulkDelete('entities', null, {})
  },
}
