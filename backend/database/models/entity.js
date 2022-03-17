const { Model } = require('sequelize')
const { pageRawContent } = require('../../constants/pageRawContent')
const Role = require('./role')
const Paper = require('./paper')
const Event = require('./event')
const Album = require('./album')
const Preinscription = require('./preinscription')

module.exports = (sequelize, DataTypes) => {
  class Entity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Entity.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      alias: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      content: {
        type: DataTypes.STRING(10000),
        defaultValue: JSON.stringify(pageRawContent),
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Entity',
    }
  )

  Entity.hasMany(Role, { foreignKey: 'entityId' })
  Role.belongsTo(Entity)

  Entity.hasMany(Paper, { foreignKey: 'entityId' })
  Paper.belongsTo(Entity)

  Entity.hasMany(Event, { foreignKey: 'entityId' })
  Event.belongsTo(Entity)

  Entity.hasMany(Album, { foreignKey: 'entityId' })
  Album.belongsTo(Entity)

  Entity.hasMany(Preinscription, { foreignKey: 'entityId' })
  Preinscription.belongsTo(Entity)
  return Entity
}
