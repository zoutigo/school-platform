const { Model } = require('sequelize')
const { pageRawContent } = require('../../constants/pageRawContent')

module.exports = (sequelize, DataTypes) => {
  class Page extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Page.init(
    {
      title: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      alias: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      content: {
        type: DataTypes.STRING(10000),
        defaultValue: JSON.stringify(pageRawContent),
      },
    },
    {
      sequelize,
      modelName: 'Page',
    }
  )
  return Page
}
