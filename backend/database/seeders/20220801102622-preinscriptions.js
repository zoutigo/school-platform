const { QueryTypes } = require('@sequelize/core')
const { v4: uuidv4 } = require('uuid')
const PreinscriptionP = require('../../models/PreinscriptionP')
const UserP = require('../../models/UserP')

module.exports = {
  async up(queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction()
    try {
      const oldPresinscs = await PreinscriptionP.findAll({
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

      const newPreIncs = await Promise.all(
        oldPresinscs.map((oldPre) => {
          const oldUser = oldUsers.find((usr) => usr.id === oldPre.userId)

          const newUser = oldUser
            ? newUsers.find((u) => u.email === oldUser.email)
            : newUsers[0]

          return {
            uuid: uuidv4(),
            userId: newUser.id,
            childFirstname: oldPre.childFirstname,
            childLastname: oldPre.childLastname,
            message: oldPre.message || 'pas de message',
            status: oldPre.status,
            createdAt: oldPre.createdAt,
            updatedAt: oldPre.updatedAt,
          }
        })
      )

      await queryInterface.bulkInsert('preinscriptions', newPreIncs, { t })
      await t.commit()
    } catch (error) {
      console.log('error', error)
      await t.rollback()
    }
  },

  async down(queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.bulkDelete('preinscriptions', null, { t })
      await t.commit()
    } catch (error) {
      console.log('error')
      await t.rollback()
    }
  },
}
