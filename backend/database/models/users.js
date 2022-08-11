const { Model, Sequelize } = require('sequelize')
const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ role, entity }) {
      this.belongsToMany(role, {
        through: 'user_roles',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      })
      role.belongsToMany(this, {
        through: 'user_roles',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      })
      this.belongsToMany(entity, {
        through: 'user_entities',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      })
      entity.belongsToMany(this, {
        through: 'user_entities',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      })
    }

    toJSON() {
      return { ...this.get(), id: undefined }
    }
  }
  User.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      lastname: {
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: {
          notNull: {
            msg: 'le prénom est obligatoire',
          },
          len: {
            args: [2, 30],
            msg: 'le prénom doit avoir entre 2 et 30 caractères',
          },
        },
      },
      firstname: {
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: {
          notNull: {
            msg: 'le nom est obligatoire',
          },
          len: {
            args: [2, 30],
            msg: 'le nom doit avoir entre 5 et 30 caractères',
          },
        },
      },
      gender: {
        type: DataTypes.STRING(DataTypes.ENUM(['monsieur', 'madame'])),
        defaultValue: 'monsieur',
      },

      email: {
        type: DataTypes.STRING(50),
        unique: true,
        validate: {
          isEmail: {
            msg: "ce format mail n'est pas valide",
          },
        },
      },
      password: {
        type: DataTypes.STRING(64),
        allowNull: false,
        validate: {
          notNull: {
            msg: 'le mot de pass est obligatoire',
          },
        },
      },
      phone: {
        type: DataTypes.INTEGER(10),
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      emailToken: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      losspassToken: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
    },
    {
      hooks: {
        afterValidate: async (user, options) => {
          const passwordValue = user.getDataValue('password')
          if (passwordValue) {
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(passwordValue, salt)
            // eslint-disable-next-line no-param-reassign
            user.password = hashedPassword
          }
        },
      },
      sequelize,
      modelName: 'user',
      tableName: 'users',
      paranoid: true,
    }
  )
  return User
}
