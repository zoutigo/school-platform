const { v4: uuidv4 } = require('uuid')
const PageP = require('../../models/PageP')

module.exports = {
  async up(queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction()

    try {
      const oldPages = await PageP.findAll({
        nest: true,
        raw: true,
      })

      const newPages = oldPages.map(({ title, alias, content }) => ({
        uuid: uuidv4(),
        title,
        slug: alias,
        content,
        createdAt: new Date(),
        updatedAt: new Date(),
      }))

      await queryInterface.bulkInsert('pages', newPages, { t })
      await t.commit()
    } catch (error) {
      await t.rollback()
      throw error
    }
  },

  async down(queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.bulkDelete('pages', null, { t })
      await t.commit()
    } catch (error) {
      await t.rollback()
      throw error
    }
  },
}
