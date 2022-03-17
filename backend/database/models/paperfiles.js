const { Model } = require('sequelize')
const File = require('./file')
const Paper = require('./paper')

module.exports = (sequelize, DataTypes) => {
  class PaperFiles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PaperFiles.init(
    {},
    {
      sequelize,
      modelName: 'PaperFiles',
      tableName: 'paper_file',
    }
  )
  Paper.belongsToMany(File, { through: PaperFiles })
  File.belongsToMany(Paper, { through: PaperFiles })
  return PaperFiles
}
