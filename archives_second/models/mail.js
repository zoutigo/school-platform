const { Model, Sequelize } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Mail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    toJSON() {
      return { ...this.get(), id: undefined }
    }
  }
  Mail.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      title: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          notNull: {
            msg: 'le titre est obligatoire',
          },
          len: {
            args: [5, 50],
            msg: 'le titre doit avoir entre 5 et 50 caractères',
          },
        },
      },
      content: {
        type: DataTypes.STRING(5000),
        allowNull: false,
        validate: {
          notNull: {
            msg: 'le contenu est obligatoire',
          },
          len: {
            args: [5, 5000],
            msg: 'le contenu doit avoir entre 5 et 5000 caractères',
          },
        },
      },
      datetosend: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "la date d'envoi est obligatoire",
          },
          isInt: {
            args: true,
            msg: 'la date doit etre un entier',
          },
        },
      },
      isSent: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: 'Mail',
      tableName: 'mails',
    }
  )
  return Mail
}
