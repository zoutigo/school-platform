const { Model, Sequelize } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class UserRole extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Role }) {
      // define association here
    }

    toJSON() {
      return { ...this.get(), id: undefined }
    }
  }
  UserRole.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
    },
    {
      sequelize,
      modelName: 'UserRole',
      tableName: 'user_roles',
    }
  )

  return UserRole
}
