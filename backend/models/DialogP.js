const Sequelize = require('sequelize')
const db = require('../config/database')

const DialogP = db.define(
  'dialog',
  {
    title: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    text: {
      type: Sequelize.STRING(2000),
      allowNull: false,
      unique: true,
    },
    startdate: {
      type: Sequelize.NUMBER,
      allowNull: false,
    },
    enddate: {
      type: Sequelize.NUMBER,
      allowNull: false,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'dialogs',
  }
)

module.exports = DialogP