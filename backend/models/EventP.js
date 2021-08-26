const Sequelize = require('sequelize')
const db = require('../config/database')

const EventP = db.define(
  'event',
  {
    title: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    content: {
      type: Sequelize.STRING(15000),
      allowNull: false,
    },
    place: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    date: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    entityId: {
      type: Sequelize.INTEGER,
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
