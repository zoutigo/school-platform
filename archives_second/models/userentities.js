const { Model, Sequelize } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class UserEntity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Entity }) {
      // define association here
    }

    toJSON() {
      return { ...this.get(), id: undefined }
    }
  }
  UserEntity.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
    },
    {
      sequelize,
      modelName: 'UserEntities',
      tableName: 'user_entities',
    }
  )

  return UserEntity
}
