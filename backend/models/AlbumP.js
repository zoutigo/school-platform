const Sequelize = require('sequelize')
const db = require('../config/database')
const FileP = require('./FileP')

const AlbumP = db.define(
  'album',
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    alias: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: Sequelize.STRING,
      defaulValue: 'Il faut une description',
    },
    isActive: {
      type: Sequelize.BOOLEAN,
      defaulValue: true,
    },
    isPrivate: {
      type: Sequelize.BOOLEAN,
      defaulValue: true,
    },
  },
  {
    tableName: 'albums',
  }
)

AlbumP.hasMany(FileP, { foreignKey: 'albumId' })
FileP.belongsTo(AlbumP)

module.exports = AlbumP
