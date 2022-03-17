const { Model } = require('sequelize')
const Preinscription = require('./preinscription')
const File = require('./file')

module.exports = (sequelize, DataTypes) => {
  class PresinscriptionFiles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PresinscriptionFiles.init(
    {},
    {
      sequelize,
      modelName: 'PresinscriptionFile',
      tableName: 'preinscription_file',
    }
  )

  Preinscription.belongsToMany(File, { through: PresinscriptionFiles })
  File.belongsToMany(Preinscription, { through: PresinscriptionFiles })

  return PresinscriptionFiles
}
