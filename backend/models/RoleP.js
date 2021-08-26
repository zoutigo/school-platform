const Sequelize = require('sequelize')
const db = require('../config/database')

const RoleP = db.define('role', {
  name: {
    type: Sequelize.STRING,
  },
  mission: {
    type: Sequelize.TEXT('medium'),
  },
  entityId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
})

module.exports = RoleP
