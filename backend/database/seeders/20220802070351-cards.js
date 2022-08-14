const { v4: uuidv4 } = require('uuid')
const CardP = require('../../models/CardP')

module.exports = {
  async up(queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction()
    try {
      const olCards = await CardP.findAll({ nest: false, raw: true })
      const newCards = olCards.map(
        ({ description, alias, path, createdAt, updatedAt }) => ({
          uuid: uuidv4(),
          descr: description,
          slug: alias,
          path,
          createdAt,
          updatedAt,
        })
      )

      await queryInterface.bulkInsert('cards', newCards, { t })

      await t.commit()
    } catch (error) {
      await t.rollback()
      throw error
    }
  },

  async down(queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.bulkDelete('cards', null, { t })
      await t.commit()
    } catch (error) {
      await t.rollback()
      throw error
    }
  },
}
