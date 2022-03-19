const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class PresinscriptionFiles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `index` file will call this method automatically.
     */
    static associate({ Preinscription, File }) {
      // define association here
      Preinscription.belongsToMany(File, {
        through: PresinscriptionFiles,
      })
      File.belongsToMany(Preinscription, {
        through: PresinscriptionFiles,
      })
    }

    toJSON() {
      return { ...this.get(), id: undefined }
    }
  }
  PresinscriptionFiles.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
    },
    {
      sequelize,
      modelName: 'PresinscriptionFile',
      tableName: 'preinscription_file',
    }
  )

  return PresinscriptionFiles
}
