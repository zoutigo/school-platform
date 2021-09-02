const Sequelize = require('sequelize')
const db = require('../config/database')

const TestP = db.define(
  'test',
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    alias: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: 'tests',
  }
)

module.exports = TestP
