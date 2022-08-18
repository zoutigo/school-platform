const { Model, Sequelize } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class UserRole extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ user, role }) {
      // define association here
      // this.hasOne(role, {
      //   foreignKey: 'roleId',
      //   onDelete: 'CASCADE',
      //   onUpdate: 'CASCADE',
      // })
      // role.belongsTo(this)
      // this.hasOne(user, {
      //   foreignKey: 'userId',
      //   onDelete: 'CASCADE',
      //   onUpdate: 'CASCADE',
      // })
      // user.belongsTo(this)
    }
  }
  UserRole.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      roleId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'roles',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
    },
    {
      sequelize,
      modelName: 'user_roles',
      tableName: 'user_roles',
    }
  )
  return UserRole
}
