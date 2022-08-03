const { QueryTypes } = require('@sequelize/core')
const { v4: uuidv4 } = require('uuid')
const MailP = require('../../models/MailP')
const UserP = require('../../models/UserP')

module.exports = {
  async up(queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction()
    try {
      const oldMails = await MailP.findAll({
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

      const newMails = await Promise.all(
        oldMails.map((oldMail) => {
          const oldUser = oldUsers.find((usr) => usr.id === oldMail.userId)

          const newUser = oldUser
            ? newUsers.find((u) => u.email === oldUser.email)
            : newUsers[0]

          return {
            uuid: uuidv4(),
            userId: newUser.id,
            title: oldMail.title,
            content: oldMail.content,
            datetosend: new Date(Number(oldMail.datetosend)),
            createdAt: oldMail.createdAt,
            updatedAt: oldMail.updatedAt,
          }
        })
      )

      await queryInterface.bulkInsert('mails', newMails, { t })
      await t.commit()
    } catch (error) {
      console.log('error', error)
      await t.rollback()
    }
  },

  async down(queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.bulkDelete('mails', null, { t })
      await t.commit()
    } catch (error) {
      console.log('error')
      await t.rollback()
    }
  },
}
