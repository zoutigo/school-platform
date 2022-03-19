const { Model } = require('sequelize')
const { pageRawContent } = require('../../constants/pageRawContent')

module.exports = (sequelize, DataTypes) => {
  class Entity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Role, Paper, Event, Album, Preinscription }) {
      // define association here

      this.hasMany(Role, { foreignKey: 'entityId' })
      Role.belongsTo(this)

      this.hasMany(Paper, { foreignKey: 'entityId' })
      Paper.belongsTo(this)

      this.hasMany(Event, { foreignKey: 'entityId' })
      Event.belongsTo(this)

      this.hasMany(Album, { foreignKey: 'entityId' })
      Album.belongsTo(this)

      this.hasMany(Preinscription, { foreignKey: 'entityId' })
      Preinscription.belongsTo(this)
    }

    toJSON() {
      return { ...this.get(), id: undefined }
    }
  }
  Entity.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      alias: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      content: {
        type: DataTypes.STRING(10000),
        defaultValue: JSON.stringify(pageRawContent),
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Entity',
    }
  )

  return Entity
}
