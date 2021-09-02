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
    // entityId: {
    //   type: Sequelize.INTEGER,
    //   allowNull: false,
    // },
  },
  {
    tableName: 'roles',
  }
)

module.exports = RoleP
