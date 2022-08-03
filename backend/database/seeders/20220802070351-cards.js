const { v4: uuidv4 } = require('uuid')
const CardP = require('../../models/CardP')

module.exports = {
  async up(queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction()
    try {
      const olCards = await CardP.findAll({ nest: false, raw: true })
      const newCards = olCards.map(
        ({ description, alias, createdAt, updatedAt }) => ({
          uuid: uuidv4(),
          desc: description,
          alias,
          createdAt,
          updatedAt,
        })
      )

      await queryInterface.bulkInsert('cards', newCards, { t })

      await t.commit()
    } catch (error) {
      console.log('error', error)
      await t.rollback()
    }
  },

  async down(queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.bulkDelete('cards', null, { t })
      await t.commit()
    } catch (error) {
      console.log('error')
      await t.rollback()
    }
  },
}
