const { Model, Sequelize } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
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
  Event.init(
    {
      uuid: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      title: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: false,
      },
      content: {
        type: Sequelize.DataTypes.STRING(15000),
        allowNull: false,
      },
      place: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: false,
      },
      date: {
        type: Sequelize.DataTypes.STRING(13),
        allowNull: false,
      },
      isPrivate: {
        type: Sequelize.Sequelize.DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: 'Event',
      tableName: 'events',
    }
  )
  return Event
}
