const { Model, Sequelize } = require('sequelize')
const slugify = require('../../utils/slugify')

module.exports = (sequelize, DataTypes) => {
  class Page extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Page.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      title: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          notNull: {
            msg: `le titre  est obligatoire`,
          },
          len: {
            args: [2, 100],
            msg: 'le titre doit avoir entre 2 et 100 caractères',
          },
        },
      },
      slug: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'le contenu est obligatoire',
          },
          len: {
            args: [2, 20000],
            msg: 'Le contenu doit avoir entre 2 et 20000 caractères',
          },
        },
      },
    },
    {
      hooks: {
        beforeCreate: async (page, options) => {
          const nameValue = page.getDataValue('title')

          if (nameValue) {
            // eslint-disable-next-line no-param-reassign
            page.slug = slugify(nameValue)
          }
        },
        beforeUpdate: async (page, options) => {
          const nameValue = page.getDataValue('title')
          if (nameValue) {
            // eslint-disable-next-line no-param-reassign
            page.slug = slugify(nameValue)
          }
        },
      },
      sequelize,
      modelName: 'page',
      tableName: 'pages',
      paranoid: true,
    }
  )
  return Page
}
