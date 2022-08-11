const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class UserEntity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ entity, user }) {
      // define association here
      // this.hasOne(entity, {
      //   foreignKey: 'roleId',
      //   onDelete: 'CASCADE',
      //   onUpdate: 'CASCADE',
      // })
      // entity.belongsTo(this)
      // this.hasOne(user, {
      //   foreignKey: 'userId',
      //   onDelete: 'CASCADE',
      //   onUpdate: 'CASCADE',
      // })
      // user.belongsTo(this)
    }
  }
  UserEntity.init(
    {},
    {
      sequelize,
      modelName: 'user_entities',
      tableName: 'user_entities',
    }
  )
  return UserEntity
}
