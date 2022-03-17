const { Model } = require('sequelize')
const File = require('./file')

module.exports = (sequelize, DataTypes) => {
  class Album extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Album.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      alias: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.STRING,
        defaulValue: 'Il faut une description',
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaulValue: true,
      },
      isPrivate: {
        type: DataTypes.BOOLEAN,
        defaulValue: true,
      },
    },
    {
      sequelize,
      modelName: 'Album',
    }
  )
  Album.hasMany(File, { foreignKey: 'albumId' })
  File.belongsTo(Album)

  return Album
}
