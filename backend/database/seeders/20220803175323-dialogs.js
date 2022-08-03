const { v4: uuidv4 } = require('uuid')
const DialogP = require('../../models/DialogP')

module.exports = {
  async up(queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction()
    try {
      const oldDialogs = await DialogP.findAll({
        nest: true,
        raw: true,
      })

      const newDialogs = oldDialogs.map(
        ({ title, text, startdate, enddate }) => ({
          uuid: uuidv4(),
          title,
          text,
          startdate: new Date(Number(startdate)),
          enddate: new Date(Number(enddate)),
          createdAt: new Date(),
          updatedAt: new Date(),
        })
      )

      await queryInterface.bulkInsert('dialogs', newDialogs, { t })
      await t.commit()
    } catch (error) {
      await t.rollback()
      throw error
    }
  },

  async down(queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.bulkDelete('dialogs', null, { t })
      await t.commit()
    } catch (error) {
      await t.rollback()
      throw error
    }
  },
}
