const Sequelize = require('sequelize')
const db = require('../config/database')
const { pageRawContent } = require('../constants/pageRawContent')

const PageP = db.define('page', {
  title: {
    type: Sequelize.STRING(100),
  },
  alias: {
    type: Sequelize.STRING(100),
  },
  content: {
    type: Sequelize.STRING(10000),
    defaultValue: JSON.stringify(pageRawContent),
  },
})

module.exports = PageP
