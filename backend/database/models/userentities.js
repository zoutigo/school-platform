const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class UserEntities extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Entity }) {
      // define association here
      User.belongsToMany(Entity, { through: this })
      Entity.belongsToMany(User, { through: this })
    }

    toJSON() {
      return { ...this.get(), id: undefined }
    }
  }
  UserEntities.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
    },
    {
      sequelize,
      modelName: 'UserEntities',
      tableName: 'user_entities',
    }
  )

  return UserEntities
}
