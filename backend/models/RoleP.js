const Sequelize = require('sequelize')
const db = require('../config/database')

const RoleP = db.define(
  'role',
  {
    name: {
      type: Sequelize.STRING,
    },
    mission: {
      type: Sequelize.STRING(200),
    },
  },
  {
    tableName: 'roles',
  }
)

module.exports = RoleP
