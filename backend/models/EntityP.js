const Sequelize = require('sequelize')
const db = require('../config/database')
const AlbumP = require('./AlbumP')
const EventP = require('./EventP')
const PaperP = require('./PaperP')
const PreinscriptionP = require('./PreinscriptionP')
const RoleP = require('./RoleP')

const EntityP = db.define('entity', {
  name: {
    type: Sequelize.STRING,
  },
  alias: {
    type: Sequelize.STRING,
  },
  content: {
    type: Sequelize.STRING,
    defaultValue: 'Empty Page',
  },
  email: {
    type: Sequelize.STRING,
  },
})

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
