const Sequelize = require('sequelize')
const db = require('../config/database')

const SuggestionP = db.define(
  'suggestion',
  {
    title: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    topic: {
      type: Sequelize.ENUM('bug', 'idea', 'improvment', 'other'),
      allowNull: false,
    },
    message: {
      type: Sequelize.STRING(1000),
      allowNull: false,
    },
    status: {
      type: Sequelize.ENUM('open', 'read', 'answered'),
      defaultValue: 'open',
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'suggestions',
  }
)

module.exports = SuggestionP
