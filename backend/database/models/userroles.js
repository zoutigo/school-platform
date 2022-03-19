const { Model, Sequelize } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class UserRoles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Role }) {
      // define association here
      User.belongsToMany(Role, { through: this })
      Role.belongsToMany(User, { through: this })
    }

    toJSON() {
      return { ...this.get(), id: undefined }
    }
  }
  UserRoles.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
    },
    {
      sequelize,
      modelName: 'UserRoles',
      tableName: 'user_roles',
    }
  )

  return UserRoles
}
