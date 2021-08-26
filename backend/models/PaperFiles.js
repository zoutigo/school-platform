const Sequelize = require('sequelize')
const db = require('../config/database')

const PaperFiles = db.define('paper_files', {
  fileId: {
    type: Sequelize.INTEGER,
  },
  paperId: {
    type: Sequelize.INTEGER,
  },
})

module.exports = PaperFiles
