const { Model } = require('sequelize')

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
      filename: {
        type: DataTypes.STRING(300),
        allowNull: false,
      },
      filepath: {
        type: DataTypes.STRING(300),
        allowNull: false,
      },
      filetype: {
        type: DataTypes.ENUM('image', 'file'),
        defaultValue: 'image',
      },
    },
    {
      sequelize,
      modelName: 'File',
    }
  )
  return File
}
