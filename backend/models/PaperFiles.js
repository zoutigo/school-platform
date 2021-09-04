const db = require('../config/database')
const FileP = require('./FileP')
const PaperP = require('./PaperP')

const PaperFiles = db.define('paper_file', {}, { timestamps: false })
PaperP.belongsToMany(FileP, { through: PaperFiles })
FileP.belongsToMany(PaperP, { through: PaperFiles })

module.exports = PaperFiles
