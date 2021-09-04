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
      type: Sequelize.STRING(300),
      allowNull: false,
    },
    filetype: {
      type: Sequelize.ENUM('image', 'file'),
      defaultValue: 'image',
    },
  },
  {
    tableName: 'files',
  }
)

module.exports = FileP
