const Sequelize = require('sequelize')
const db = require('../config/database')

const PageP = db.define('page', {
  title: {
    type: Sequelize.STRING,
  },
  alias: {
    type: Sequelize.STRING,
  },
  content: {
    type: Sequelize.STRING,
    defaultValue: 'Empty Page',
  },
})

module.exports = PageP
