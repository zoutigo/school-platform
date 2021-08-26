const Sequelize = require('sequelize')
const db = require('../config/database')
const FileP = require('./FileP')

const PreinscriptionP = db.define(
  'preinscription',
  {
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    entityId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    childFirstname: {
      type: Sequelize.STRING(30),
      allowNull: false,
    },
    childLastname: {
      type: Sequelize.STRING(30),
      allowNull: false,
    },
    message: {
      type: Sequelize.STRING(1500),
    },
    status: {
      type: Sequelize.ENUM('etude', 'encours', 'cloturé'),
      defaultValue: 'etude',
    },
    verdict: {
      type: Sequelize.ENUM('ok', 'nok', 'encours'),
      defaultValue: 'encours',
    },
  },
  {
    tableName: 'preinscriptions',
  }
)

PreinscriptionP.belongsToMany(FileP, { through: 'preinscription_files' })
FileP.belongsToMany(PreinscriptionP, { through: 'preinscription_files' })

module.exports = PreinscriptionP
