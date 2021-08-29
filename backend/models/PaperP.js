const Sequelize = require('sequelize')
const db = require('../config/database')
const FileP = require('./FileP')

const PaperP = db.define(
  'paper',
  {
    type: {
      type: Sequelize.ENUM(
        'article',
        'activite',
        'parent-info',
        'newsletter',
        'menu',
        'breve',
        'info',
        'fourniture'
      ),
      allowNull: false,
    },
    title: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    content: {
      type: Sequelize.TEXT,
    },
    classe_fourniture: {
      type: Sequelize.STRING(30),
    },
    isPrivate: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
    date: {
      type: Sequelize.STRING(14),
      defaultValue: new Date().getTime(),
    },
    startdate: {
      type: Sequelize.STRING(14),
    },
    enddate: {
      type: Sequelize.STRING(14),
    },
    userId: {
      type: Sequelize.INTEGER,
      defaultValue: 1,
    },
    entityId: {
      type: Sequelize.INTEGER,
      defaultValue: 13,
    },
  },
  {
    tableName: 'papers',
  }
)

PaperP.belongsToMany(FileP, { through: 'paper_files' })
FileP.belongsToMany(PaperP, { through: 'paper_files' })

module.exports = PaperP
