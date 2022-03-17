const { Model } = require('sequelize')
const Entity = require('./entity')
const Role = require('./role')
const Event = require('./event')
const Suggestion = require('./suggestion')
const Paper = require('./paper')
const Dialog = require('./dialog')
const Preinscription = require('./preinscription')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  User.init(
    {
      lastname: {
        type: DataTypes.STRING(30),
      },
      firstname: {
        type: DataTypes.STRING(30),
      },
      gender: {
        type: DataTypes.ENUM('monsieur', 'madame', 'choisir'),
        defaultValue: 'choisir',
      },
      email: {
        type: DataTypes.STRING(50),
        unique: true,
      },
      phone: {
        type: DataTypes.STRING(14),
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isManager: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isModerator: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isTeacher: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      password: {
        type: DataTypes.STRING(64),
      },
      emailToken: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      losspassToken: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  )

  User.belongsToMany(Role, { through: 'user_roles' })
  Role.belongsToMany(User, { through: 'user_roles' })

  User.belongsToMany(Entity, { through: 'user_entities' })
  Entity.belongsToMany(User, { through: 'user_entities' })

  User.hasMany(Suggestion, { foreignKey: 'userId' })
  Suggestion.belongsTo(User)

  User.hasMany(Paper, { foreignKey: 'userId' })
  Paper.belongsTo(User)

  User.hasMany(Dialog, { foreignKey: 'userId' })
  Dialog.belongsTo(User)

  User.hasMany(Event, { foreignKey: 'userId' })
  Event.belongsTo(User)

  User.hasMany(Preinscription, { foreignKey: 'userId' })
  Preinscription.belongsTo(User)

  return User
}
