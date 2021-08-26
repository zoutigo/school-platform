const Sequelize = require('sequelize')
const db = require('../config/database')
const AlbumP = require('./AlbumP')
const FileP = require('./FileP')

const AlbumImage = db.define(
  'image',
  {
    album_id: {
      type: Sequelize.INTEGER,
    },
    file_id: {
      type: Sequelize.INTEGER,
    },
  },
  {
    tableName: 'albums_images',
  }
)

module.exports = AlbumImage
