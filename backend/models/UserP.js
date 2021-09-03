const Sequelize = require('sequelize')
const db = require('../config/database')
const DialogP = require('./DialogP')
const EntityP = require('./EntityP')
const EventP = require('./EventP')
const PaperP = require('./PaperP')
const PreinscriptionP = require('./PreinscriptionP')
const RoleP = require('./RoleP')
const SuggestionP = require('./SuggestionP')

const UserP = db.define('user', {
  lastname: {
    type: Sequelize.STRING(30),
  },
  firstname: {
    type: Sequelize.STRING(30),
  },
  gender: {
    type: Sequelize.ENUM('monsieur', 'madame', 'choisir'),
    defaultValue: 'choisir',
  },
  email: {
    type: Sequelize.STRING(50),
    unique: true,
  },
  phone: {
    type: Sequelize.STRING(14),
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  isManager: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  isModerator: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  isTeacher: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  isVerified: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  password: {
    type: Sequelize.STRING(64),
  },
  emailToken: {
    type: Sequelize.STRING,
    defaultValue: null,
  },
  losspassToken: {
    type: Sequelize.STRING,
    defaultValue: null,
  },
})

// UserP.hasMany(RoleP, { foreignKey: 'entityId' })
// RoleP.belongsTo(UserP)

UserP.belongsToMany(RoleP, { through: 'user_roles' })
RoleP.belongsToMany(UserP, { through: 'user_roles' })

UserP.belongsToMany(EntityP, { through: 'user_entities' })
EntityP.belongsToMany(UserP, { through: 'user_entities' })

UserP.hasMany(SuggestionP, { foreignKey: 'userId' })
SuggestionP.belongsTo(UserP)

UserP.hasMany(PaperP, { foreignKey: 'userId' })
PaperP.belongsTo(UserP)

UserP.hasMany(DialogP, { foreignKey: 'userId' })
DialogP.belongsTo(UserP)

UserP.hasMany(EventP, { foreignKey: 'userId' })
EventP.belongsTo(UserP)

UserP.hasMany(PreinscriptionP, { foreignKey: 'userId' })
PreinscriptionP.belongsTo(UserP)

module.exports = UserP
