const { Model, Sequelize } = require('sequelize')
const slugify = require('../../utils/slugify')

module.exports = (sequelize, DataTypes) => {
  class Album extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ file }) {
      this.hasMany(file, {
        foreignKey: 'albumId',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      })
      file.belongsTo(this)
    }
  }
  Album.init(
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
            msg: `le nom de l'album est obligatoire`,
          },
          len: {
            args: [2, 100],
            msg: 'le nom de album doit avoir entre 2 et 100 caractères',
          },
        },
      },
      slug: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      descr: {
        type: DataTypes.STRING(300),
        allowNull: false,
        validate: {
          notNull: {
            msg: 'La description de album est obligatoire',
          },
          len: {
            args: [2, 300],
            msg: 'La description de album doit avoir entre 2 et 300 caractères',
          },
        },
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      isPrivate: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      hooks: {
        beforeCreate: async (entity, options) => {
          const nameValue = entity.getDataValue('name')

          if (nameValue) {
            // eslint-disable-next-line no-param-reassign
            entity.slug = slugify(nameValue)
          }
        },
        beforeUpdate: async (entity, options) => {
          const nameValue = entity.getDataValue('name')
          if (nameValue) {
            // eslint-disable-next-line no-param-reassign
            entity.slug = slugify(nameValue)
          }
        },
      },
      sequelize,
      modelName: 'album',
      tableName: 'albums',
      paranoid: true,
    }
  )
  return Album
}
