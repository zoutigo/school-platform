const { Model, Sequelize } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }

    toJSON() {
      return { ...this.get(), id: undefined }
    }
  }
  Role.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
      },
      mission: {
        type: DataTypes.STRING(200),
      },
    },
    {
      sequelize,
      modelName: 'Role',
      tableName: 'roles',
    }
  )

  return Role
}
