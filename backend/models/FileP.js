const Sequelize = require('sequelize')
const db = require('../config/database')

const FileP = db.define(
  'file',
  {
    filename: {
      type: Sequelize.STRING(300),
      allowNull: false,
    },
    filepath: {
      type: Sequelize.STRING(150),
      allowNull: false,
    },
    filetype: {
      type: Sequelize.ENUM('image', 'file'),
      defaultValue: 'image',
    },
    albumId: {
      type: Sequelize.UUID(),
      allowNull: false,
    },
  },
  {
    tableName: 'files',
  }
)

module.exports = FileP