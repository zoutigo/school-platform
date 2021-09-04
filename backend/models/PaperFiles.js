const db = require('../config/database')
const FileP = require('./FileP')
const PaperP = require('./PaperP')

const PaperFiles = db.define('paper_file', {}, { timestamps: false })
PaperP.belongsToMany(FileP, { through: PaperFiles })
FileP.belongsToMany(PaperP, { through: PaperFiles })

PaperP.belongsToMany(FileP, { through: 'paper_files' })
FileP.belongsToMany(PaperP, { through: 'paper_files' })

module.exports = PaperFiles
