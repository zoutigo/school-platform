const { Model, Sequelize } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Paper extends Model {
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
  Paper.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      type: {
        type: DataTypes.ENUM,
        values: [
          'article',
          'activite',
          'parent-info',
          'newsletter',
          'menu',
          'breve',
          'info',
          'fourniture',
        ],
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING(10000),
      },
      classe_fourniture: {
        type: DataTypes.STRING(30),
      },
      isPrivate: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      date: {
        type: DataTypes.STRING(14),
        defaultValue: new Date().getTime(),
      },
      startdate: {
        type: DataTypes.STRING(14),
      },
      enddate: {
        type: DataTypes.STRING(14),
      },
      files: {
        type: Sequelize.ARRAY(Sequelize.JSONB),
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Paper',
    }
  )

  return Paper
}
