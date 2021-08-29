const Sequelize = require('sequelize')
const db = require('../config/database')
const AlbumP = require('./AlbumP')
const FileP = require('./FileP')

const AlbumImage = db.define(
  'image',
  {
    albumId: {
      type: Sequelize.INTEGER,
    },
    fileId: {
      type: Sequelize.INTEGER,
    },
  },
  {
    tableName: 'albums_images',
  }
)

module.exports = AlbumImage
