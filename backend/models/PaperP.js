const Sequelize = require('sequelize')
const db = require('../config/database')

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
      type: Sequelize.STRING(10000),
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
  },
  {
    tableName: 'papers',
  }
)

module.exports = PaperP
