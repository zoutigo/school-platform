const { Model, Sequelize } = require('sequelize')
const slugify = require('../../utils/slugify')

module.exports = (sequelize, DataTypes) => {
  class Card extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ file }) {
      this.hasMany(file, {
        foreignKey: 'cardId',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      })
      file.belongsTo(this)
    }

    toJSON() {
      return { ...this.get(), id: undefined }
    }
  }
  Card.init(
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
            msg: `le nom de la carte est obligatoire`,
          },
          len: {
            args: [2, 100],
            msg: 'le nom de la carte doit avoir entre 2 et 100 caractères',
          },
        },
      },
      slug: {
        type: DataTypes.STRING(100),
        allowNull: true,
        unique: true,
      },
      path: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          notNull: {
            msg: `le chemin est obligatoire`,
          },
          len: {
            args: [2, 100],
            msg: 'Le chemin doit avoir entre 2 et 100 caractères',
          },
        },
      },
      descr: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: {
            args: [2, 300],
            msg: 'La description doit avoir entre 2 et 300 caractères',
          },
        },
      },
    },
    {
      hooks: {
        beforeCreate: async (card, options) => {
          const nameValue = card.getDataValue('name')

          if (nameValue) {
            // eslint-disable-next-line no-param-reassign
            card.slug = slugify(nameValue)
          }
        },
        beforeUpdate: async (card, options) => {
          const nameValue = card.getDataValue('name')
          if (nameValue) {
            // eslint-disable-next-line no-param-reassign
            card.slug = slugify(nameValue)
          }
        },
      },
      sequelize,
      modelName: 'card',
      tableName: 'cards',
      paranoid: true,
    }
  )
  return Card
}
