const { Model } = require('sequelize')
const Entity = require('./entity')
const User = require('./user')

module.exports = (sequelize, DataTypes) => {
  class UserEntities extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserEntities.init(
    {
      mission: DataTypes.STRING,
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'UserEntities',
      tableName: 'user_entities',
    }
  )

  User.belongsToMany(Entity, { through: UserEntities })
  Entity.belongsToMany(User, { through: UserEntities })

  return UserEntities
}
