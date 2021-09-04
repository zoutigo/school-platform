const db = require('../config/database')
const FileP = require('./FileP')
const PreinscriptionP = require('./PreinscriptionP')

const PreinscriptionFiles = db.define(
  'preinscription_file',
  {},
  { timestamps: false }
)
PreinscriptionP.belongsToMany(FileP, { through: PreinscriptionFiles })
FileP.belongsToMany(PreinscriptionP, { through: PreinscriptionFiles })

module.exports = PreinscriptionFiles
