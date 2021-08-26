const Sequelize = require('sequelize')
const db = require('../config/database')

const CardImages = db.define(
  'card_image',
  {
    fileId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    cardId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'card_images',
  }
)

module.exports = CardImages
