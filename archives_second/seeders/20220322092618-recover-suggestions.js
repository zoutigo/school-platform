const SuggestionP = require('../../models/SuggestionP')
const { User } = require('../models')

module.exports = {
  async up(queryInterface, Sequelize) {
    const oldSuggestions = await SuggestionP.findAll()
    const newUsers = await User.findAll()

    const suggestions = oldSuggestions.map((sugg) => ({
      title: sugg.title,
      topic: sugg.topic,
      message: sugg.message,
      status: sugg.status,
      createdAt: sugg.createdAt,
      updatedAt: sugg.updatedAt,
      userId: newUsers[0].id,
    }))

    await queryInterface.bulkInsert('suggestions', suggestions, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('suggestions', null, {})
  },
}
