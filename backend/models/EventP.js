const Sequelize = require('sequelize')
const db = require('../config/database')

const EventP = db.define(
  'event',
  {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    content: {
      type: Sequelize.STRING(15000),
      allowNull: false,
    },
    place: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    date: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    isPrivate: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: 'events',
  }
)

module.exports = EventP
