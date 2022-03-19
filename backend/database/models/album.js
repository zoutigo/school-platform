const { Model, Sequelize } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Album extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ File }) {
      // define association here
      this.hasMany(File, { foreignKey: 'albumId' })
      File.belongsTo(this)
    }

    toJSON() {
      return { ...this.get(), id: undefined }
    }
  }
  Album.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
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
      tableName: 'albums',
    }
  )

  return Album
}
