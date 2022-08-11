const { QueryTypes } = require('@sequelize/core')
const { v4: uuidv4 } = require('uuid')
const EntityP = require('../../models/EntityP')
const RoleP = require('../../models/RoleP')
const UserP = require('../../models/UserP')
const UserRoles = require('../../models/UserRoles')
const defineMainRole = require('../../utils/defineMainRole')

module.exports = {
  async up(queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction()

    try {
      const oldUsers = await UserP.findAll()
      const oldUserRoles = await UserRoles.findAll()
      const newRoles = await queryInterface.sequelize.query(
        ` SELECT * FROM roles`,
        {
          type: QueryTypes.SELECT,
        }
      )
      const newUsers = await queryInterface.sequelize.query(
        ` SELECT * FROM users`,
        {
          type: QueryTypes.SELECT,
        }
      )

      const newUserRoles = await Promise.all(
        oldUserRoles.map(
          async ({ dataValues: { userId, roleId, createdAt, updatedAt } }) => {
            const oldUser = await UserP.findOne({ where: { id: userId } })

            const [newUser] = await queryInterface.sequelize.query(
              ` SELECT * FROM users WHERE email = ?`,
              {
                type: QueryTypes.SELECT,
                replacements: [oldUser.email],
              }
            )

            const oldRole = await RoleP.findOne({
              where: { id: roleId },
              include: [EntityP],
            })

            const newRole = newRoles.find(
              (role) => role.name.indexOf(oldRole.entity.alias) !== -1
            )

            return {
              roleId: newRole.id,
              userId: newUser.id,
              createdAt,
              updatedAt: new Date(),
            }
          }
        )
      )

      // main roles

      const mainUsersRoles = oldUsers
        .filter(
          (user) =>
            user.isManager === true ||
            user.isModerator === true ||
            user.isAdmin === true
        )
        .map((usr) => {
          const newMainUser = newUsers.find((u) => u.email === usr.email)
          const newMainRole = newRoles.find(
            (role) => role.name === defineMainRole(usr)
          )

          return {
            roleId: newMainRole.id,
            userId: newMainUser.id,
            uuid: uuidv4(),
            createdAt: new Date(),
            updatedAt: new Date(),
          }
        })

      await queryInterface.bulkInsert('user_roles', newUserRoles, { t })
      await queryInterface.bulkInsert('user_roles', mainUsersRoles, { t })

      await t.commit()
    } catch (error) {
      await t.rollback()
      throw error
    }
  },

  async down(queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.bulkDelete('user_roles', null, { t })
      await t.commit()
    } catch (error) {
      await t.rollback()
      throw error
    }
  },
}
