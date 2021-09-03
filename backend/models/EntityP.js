const Sequelize = require('sequelize')
const db = require('../config/database')
const { pageRawContent } = require('../constants/pageRawContent')
const AlbumP = require('./AlbumP')
const EventP = require('./EventP')
const PaperP = require('./PaperP')
const PreinscriptionP = require('./PreinscriptionP')
const RoleP = require('./RoleP')

const EntityP = db.define(
  'entity',
  {
    name: {
      type: Sequelize.STRING,
    },
    alias: {
      type: Sequelize.STRING,
    },
    content: {
      type: Sequelize.STRING(10000),
      defaultValue: JSON.stringify(pageRawContent),
    },
    email: {
      type: Sequelize.STRING,
    },
  },
  {
    tableName: 'entities',
  }
)

EntityP.hasMany(RoleP, { foreignKey: 'entityId' })
RoleP.belongsTo(EntityP)

EntityP.hasMany(PaperP, { foreignKey: 'entityId' })
PaperP.belongsTo(EntityP)

EntityP.hasMany(EventP, { foreignKey: 'entityId' })
EventP.belongsTo(EntityP)

EntityP.hasMany(AlbumP, { foreignKey: 'entityId' })
AlbumP.belongsTo(EntityP)

EntityP.hasMany(PreinscriptionP, { foreignKey: 'entityId' })
PreinscriptionP.belongsTo(EntityP)

module.exports = EntityP
