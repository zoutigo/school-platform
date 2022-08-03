const { v4: uuidv4 } = require('uuid')
const { QueryTypes } = require('@sequelize/core')
const CardP = require('../../models/CardP')

module.exports = {
  async up(queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction()
    try {
      const oldCards = await CardP.findAll({
        nest: true,
        raw: true,
      })

      const newCards = await queryInterface.sequelize.query(
        ` SELECT * FROM cards`,
        {
          type: QueryTypes.SELECT,
        }
      )
      const newFiles = await queryInterface.sequelize.query(
        ` SELECT * FROM files`,
        {
          type: QueryTypes.SELECT,
        }
      )

      const cardFiles = newCards.map((card) => {
        const file = newFiles.find(
          (f) => JSON.stringify(f.filename) === JSON.stringify(card.alias)
        )
        return {
          cardId: card.id,
          fileId: file.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      })

      await queryInterface.bulkInsert('card_files', cardFiles, { t })

      await t.commit()
    } catch (error) {
      await t.rollback()
      throw error
    }
  },

  async down(queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.bulkDelete('card_files', null, { t })
      await t.commit()
    } catch (error) {
      await t.rollback()
      throw error
    }
  },
}
