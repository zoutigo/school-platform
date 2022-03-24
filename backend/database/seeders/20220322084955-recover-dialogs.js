const { QueryTypes } = require('@sequelize/core')

const DialogP = require('../../models/DialogP')
const UserP = require('../../models/UserP')
const { User } = require('../models')

module.exports = {
  async up(queryInterface, Sequelize) {
    const oldUsers = await UserP.findAll()
    // const newUsers = await User.findAll()
    const newUsers = await queryInterface.sequelize.query(
      ` SELECT * FROM users`,
      {
        type: QueryTypes.SELECT,
      }
    )

    const oldDialogs = await DialogP.findAll()

    const dialogs = oldDialogs.map((dialog) => {
      const oldUser = oldUsers.find(
        (user) => Number(user.id) === Number(dialog.userId)
      )
      const newUser = newUsers.find(
        (user) => String(user.email) === String(oldUser.email)
      )

      return {
        title: dialog.title,
        text: dialog.text,
        startdate: dialog.startdate,
        enddate: dialog.enddate,
        userId: newUser.id,
        createdAt: dialog.createdAt,
        updatedAt: dialog.updatedAt,
      }
    })

    await queryInterface.bulkInsert('dialogs', dialogs, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('dialogs', null, {})
  },
}
