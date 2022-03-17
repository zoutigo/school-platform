const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Suggestion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Suggestion.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      topic: {
        type: DataTypes.ENUM('bug', 'idea', 'improvment', 'other'),
        allowNull: false,
      },
      message: {
        type: DataTypes.STRING(1000),
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('open', 'read', 'answered'),
        defaultValue: 'open',
      },
    },
    {
      sequelize,
      modelName: 'Suggestion',
    }
  )
  return Suggestion
}
