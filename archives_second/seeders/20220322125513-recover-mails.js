const { QueryTypes } = require('@sequelize/core')
const MailP = require('../../models/MailP')
const UserP = require('../../models/UserP')

module.exports = {
  async up(queryInterface, Sequelize) {
    const oldUsers = await UserP.findAll()
    const newUsers = await queryInterface.sequelize.query(
      ` SELECT * FROM users`,
      {
        type: QueryTypes.SELECT,
      }
    )

    const oldMails = await MailP.findAll()

    const mails = oldMails.map((mail) => {
      const oldUser = oldUsers.find(
        (user) => Number(user.id) === Number(mail.userId)
      )
      const newUser = newUsers.find(
        (user) => String(user.email) === String(oldUser.email)
      )

      return {
        title: mail.title,
        content: mail.content,
        datetosend: mail.datetosend,
        isSent: mail.isSent,
        userId: newUser.id,
        createdAt: mail.createdAt,
        updatedAt: mail.updatedAt,
      }
    })

    await queryInterface.bulkInsert('mails', mails, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('mails', null, {})
  },
}
