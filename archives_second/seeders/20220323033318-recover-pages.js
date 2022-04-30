const EntityP = require('../../models/EntityP')
const PageP = require('../../models/PageP')

module.exports = {
  async up(queryInterface, Sequelize) {
    const oldPages = await PageP.findAll()

    const pages = oldPages.map((page) => ({
      title: page.title,
      content: page.content,
      alias: page.alias,
      createdAt: page.createdAt,
      updatedAt: page.updatedAt,
    }))

    await queryInterface.bulkInsert('pages', pages, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('pages', null, {})
  },
}
