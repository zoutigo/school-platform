const { Model } = require('sequelize')
const File = require('./file')

module.exports = (sequelize, DataTypes) => {
  class Preinscription extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Preinscription.init(
    {
      childFirstname: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      childLastname: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      message: {
        type: DataTypes.STRING(1500),
      },
      status: {
        type: DataTypes.ENUM('etude', 'encours', 'cloturé'),
        defaultValue: 'etude',
      },
      verdict: {
        type: DataTypes.ENUM('ok', 'nok', 'encours'),
        defaultValue: 'encours',
      },
    },
    {
      sequelize,
      modelName: 'Presincription',
    }
  )

  Preinscription.belongsToMany(File, { through: 'preinscription_files' })
  File.belongsToMany(Preinscription, { through: 'preinscription_files' })

  return Preinscription
}
