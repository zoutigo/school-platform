const Sequelize = require('sequelize')
const db = require('../config/database')

const UserRoles = db.define('user_roles', {
  userId: {
    type: Sequelize.INTEGER,
  },
  roleId: {
    type: Sequelize.INTEGER,
  },
})

module.exports = UserRoles
