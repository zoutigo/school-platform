const { Model, Sequelize } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Entity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ role }) {
      this.hasMany(role, {
        foreignKey: 'roleId',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      })
    }
  }
  Entity.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          notNull: {
            msg: "le nom de l'entité est obligatoire",
          },
          len: {
            args: [2, 100],
            msg: 'le nom doit avoir entre 2 et 100 caractères',
          },
        },
      },
      alias: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            msg: "l'alias de l'entité est obligatoire",
          },
          len: {
            args: [2, 100],
            msg: 'le nom doit avoir entre 2 et 100 caractères',
          },
        },
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          notNull: {
            msg: "l'alias de l'entité est obligatoire",
          },
          len: {
            args: [2, 100],
            msg: 'le nom doit avoir entre 2 et 100 caractères',
          },
        },
      },
      content: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'entity',
      tableName: 'entities',
      paranoid: true,
    }
  )
  return Entity
}
