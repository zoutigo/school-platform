const Sequelize = require('sequelize')
const db = require('../config/database')

const DialogP = db.define(
  'dialog',
  {
    title: {
      type: Sequelize.STRING(300),
      allowNull: false,
    },
    text: {
      type: Sequelize.STRING(10000),
      allowNull: false,
      unique: true,
    },
    startdate: {
      type: Sequelize.BIGINT(14),
      allowNull: false,
    },
    enddate: {
      type: Sequelize.BIGINT(14),
      allowNull: false,
    },
    // userId: {
    //   type: Sequelize.INTEGER,
    //   allowNull: false,
    // },
  },
  {
    tableName: 'dialogs',
  }
)

module.exports = DialogP
