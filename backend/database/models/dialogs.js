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
  }
  Dialog.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
      },

      title: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          notNull: {
            msg: `le titre est obligatoire`,
          },
          len: {
            args: [2, 100],
            msg: 'le titre doit avoir entre 2 et 100 caractères',
          },
        },
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      startdate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      enddate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'dialog',
      tableName: 'dialogs',
      paranoid: true,
      timestamps: true,
    }
  )
  return Dialog
}
