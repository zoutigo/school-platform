const Sequelize = require('sequelize')
const db = require('../config/database')
const FileP = require('./FileP')

const CardP = db.define(
  'card',
  {
    path: {
      type: Sequelize.STRING(64),
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING(1000),
      allowNull: false,
    },
    alias: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
  },
  {
    tableName: 'cards',
  }
)

module.exports = CardP
