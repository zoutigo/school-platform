const { Model, Sequelize } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class File extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  File.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      filename: {
        type: DataTypes.STRING(150),
        allowNull: false,
        validate: {
          notNull: {
            msg: 'le nom du fichier est obligatoire',
          },
          len: {
            args: [2, 150],
            msg: 'le nom du fichier doit avoir entre 2 et 150 caractères',
          },
        },
      },
      filepath: {
        type: DataTypes.STRING(150),
        allowNull: false,
        validate: {
          notNull: {
            msg: 'le chemin du fichier est obligatoire',
          },
          len: {
            args: [2, 150],
            msg: 'le chemin du fichier doit avoir entre 2 et 150 caractères',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'file',
      tableName: 'files',
      paranoid: true,
    }
  )
  return File
}
