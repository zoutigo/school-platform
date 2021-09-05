const db = require('../config/database')
const CardP = require('./CardP')
const FileP = require('./FileP')

const CardImages = db.define('card_image', {}, { timestamps: true })
CardP.belongsToMany(FileP, { through: CardImages })
FileP.belongsToMany(CardP, { through: CardImages })

module.exports = CardImages
