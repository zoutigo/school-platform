const { Model, Sequelize } = require('sequelize')
const slugify = require('../../utils/slugify')

module.exports = (sequelize, DataTypes) => {
  class Entity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ role, album }) {
      this.hasMany(role, {
        foreignKey: 'entityId',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
        allowNull: true,
      })
      role.belongsTo(this)

      this.hasMany(album, {
        foreignKey: 'entityId',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      })
      album.belongsTo(this)
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
        allowNull: true,
        unique: true,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          notNull: {
            msg: "le mail de l'entité est obligatoire",
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
      hooks: {
        beforeCreate: async (entity, options) => {
          const nameValue = entity.getDataValue('name')

          if (nameValue) {
            // eslint-disable-next-line no-param-reassign
            entity.alias = slugify(nameValue)
          }
        },
        beforeUpdate: async (entity, options) => {
          const nameValue = entity.getDataValue('name')
          if (nameValue) {
            // eslint-disable-next-line no-param-reassign
            entity.alias = slugify(nameValue)
          }
        },
      },
      sequelize,
      modelName: 'entity',
      tableName: 'entities',
      paranoid: true,
    }
  )
  return Entity
}
