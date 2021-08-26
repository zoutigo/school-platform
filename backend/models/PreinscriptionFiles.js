const Sequelize = require('sequelize')
const db = require('../config/database')

const PreinscriptionP = db.define(
  'preinscription_files',
  {
    fileId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    preinscriptionId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'preinscription_files',
  }
)

module.exports = PreinscriptionP
