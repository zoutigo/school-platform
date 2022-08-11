const { Model, Sequelize } = require('sequelize')
const slugify = require('../../utils/slugify')

module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {}

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
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Le nom du role est obligatoire',
          },
          len: {
            args: [2, 100],
            msg: 'le prénom doit avoir entre 2 et 100 caractères',
          },
        },
      },
      slug: {
        type: DataTypes.STRING(150),
        unique: true,
      },
      descr: {
        type: DataTypes.STRING(200),
        allowNull: false,
        validate: {
          notNull: {
            msg: 'La description du role est obligatoire',
          },
          len: {
            args: [2, 200],
            msg: 'La description du role doit avoir entre 2 et 200 caractères',
          },
        },
      },
    },

    {
      hooks: {
        afterValidate: async (role, options) => {
          const nameValue = role.getDataValue('name')
          if (nameValue) {
            // eslint-disable-next-line no-param-reassign
            role.slug = slugify(nameValue)
          }
        },
      },
      sequelize,
      modelName: 'role',
      tableName: 'roles',
      paranoid: true,
    }
  )
  return Role
}
