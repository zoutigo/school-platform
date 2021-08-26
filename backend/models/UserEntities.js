const Sequelize = require('sequelize')
const db = require('../config/database')

const UserEntities = db.define('user_entities', {
  userId: {
    type: Sequelize.INTEGER,
  },
  entityId: {
    type: Sequelize.INTEGER,
  },
})

module.exports = UserEntities
