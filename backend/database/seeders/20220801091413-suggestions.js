const { QueryTypes } = require('@sequelize/core')
const { v4: uuidv4 } = require('uuid')
const SuggestionP = require('../../models/SuggestionP')
const UserP = require('../../models/UserP')

module.exports = {
  async up(queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction()

    try {
      const oldSuggestions = await SuggestionP.findAll({
        nest: false,
        raw: true,
      })
      const oldUsers = await UserP.findAll({
        nest: false,
        raw: true,
      })

      const newUsers = await queryInterface.sequelize.query(
        ` SELECT * FROM users`,
        {
          type: QueryTypes.SELECT,
        }
      )

      const newSuggestions = await Promise.all(
        oldSuggestions.map((oldsuggestion) => {
          const oldUser = oldUsers.find(
            (usr) => usr.id === oldsuggestion.userId
          )

          const newUser = oldUser
            ? newUsers.find((u) => u.email === oldUser.email)
            : newUsers[0]

          return {
            uuid: uuidv4(),
            userId: newUser.id,
            topic: oldsuggestion.topic,
            status: oldsuggestion.status,
            title: oldsuggestion.title,
            content: oldsuggestion.message,
            createdAt: oldsuggestion.createdAt,
            updatedAt: oldsuggestion.updatedAt,
          }
        })
      )

      await queryInterface.bulkInsert('suggestions', newSuggestions, { t })
      await t.commit()
    } catch (error) {
      console.log('error', error)
      await t.rollback()
    }
  },

  async down(queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction()

    try {
      await queryInterface.bulkDelete('suggestions', null, { t })
      await t.commit()
    } catch (error) {
      console.log('error')
      await t.rollback()
    }
  },
}
