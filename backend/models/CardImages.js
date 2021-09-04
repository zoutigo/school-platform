const db = require('../config/database')
const CardP = require('./CardP')
const FileP = require('./FileP')

const CardImages = db.define('Card_Image', {}, { timestamps: false })
CardP.belongsToMany(FileP, { through: CardImages })
FileP.belongsToMany(CardP, { through: CardImages })

module.exports = CardImages
