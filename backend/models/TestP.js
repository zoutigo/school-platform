const Sequelize = require('sequelize')
const db = require('../config/database')
const FileP = require('./FileP')

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
    description: {
      type: Sequelize.STRING,
      defaulValue: 'Il faut une description',
    },
    entityId: {
      type: Sequelize.INTEGER,
    },
    isActive: {
      type: Sequelize.BOOLEAN,
      defaulValue: true,
    },
    isPrivate: {
      type: Sequelize.BOOLEAN,
      defaulValue: true,
    },
  },
  {
    tableName: 'tests',
  }
)

module.exports = TestP
