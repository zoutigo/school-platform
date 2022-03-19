const { Model, Sequelize } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Preinscription extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `index` file will call this method automatically.
     */
    static associate({ File }) {
      // define association here
      this.belongsToMany(File, {
        through: 'preinscription_files',
      })
      File.belongsToMany(this, {
        through: 'preinscription_files',
      })
    }

    toJSON() {
      return { ...this.get(), id: undefined }
    }
  }
  Preinscription.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
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

  return Preinscription
}
