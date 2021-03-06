const { Model, Sequelize } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Dialog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    toJSON() {
      return { ...this.get(), id: undefined }
    }
  }
  Dialog.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      text: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      startdate: {
        type: DataTypes.STRING(13),
        allowNull: false,
      },
      enddate: {
        type: DataTypes.STRING(13),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Dialog',
      tableName: 'dialogs',
    }
  )
  return Dialog
}
