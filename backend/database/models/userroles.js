const { Model } = require('sequelize')
const User = require('./user')
const Role = require('./role')

module.exports = (sequelize, DataTypes) => {
  class UserRoles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserRoles.init(
    {
      mission: DataTypes.STRING,
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'UserRoles',
      tableName: 'user_roles',
    }
  )

  User.belongsToMany(Role, { through: UserRoles })
  Role.belongsToMany(User, { through: UserRoles })

  return UserRoles
}
