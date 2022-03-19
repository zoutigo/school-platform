const SuggestionP = require('../../models/SuggestionP')

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

    const oldSuggestions = await SuggestionP.findAll()
    const suggestions = oldSuggestions.map((sugg) => ({
      title: sugg.title,
      topic: sugg.topic,
      message: sugg.message,
      status: sugg.status,
      createdAt: sugg.createdAt,
      updatedAt: sugg.updatedAt,
      userId: 6,
    }))
    console.log('suggestions', suggestions)

    await queryInterface.bulkInsert('suggestions', suggestions, {})
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkInsert('suggestions', null, {})
  },
}
