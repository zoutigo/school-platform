const Sequelize = require('sequelize')
const db = require('../config/database')
const CardP = require('./CardP')
const FileP = require('./FileP')

// const CardImages = db.define(
//   'card_image',
//   {
//     fileId: {
//       type: Sequelize.INTEGER,
//       allowNull: false,
//     },
//     cardId: {
//       type: Sequelize.INTEGER,
//       allowNull: false,
//     },
//   },
//   {
//     tableName: 'card_images',
//   }
// )

const CardImages = db.define('Card_Image', {}, { timestamps: false })
CardP.belongsToMany(FileP, { through: CardImages })
FileP.belongsToMany(CardP, { through: CardImages })

module.exports = CardImages
