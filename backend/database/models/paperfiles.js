const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class PaperFiles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Paper, File }) {
      // define association here
      Paper.belongsToMany(File, { through: this })
      File.belongsToMany(Paper, { through: this })
    }

    toJSON() {
      return { ...this.get(), id: undefined }
    }
  }
  PaperFiles.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
    },
    {
      sequelize,
      modelName: 'PaperFiles',
      tableName: 'paper_file',
    }
  )

  return PaperFiles
}
