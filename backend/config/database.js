const Sequelize = require('sequelize')

const db = new Sequelize('augustin', 'postgres', 'valery54', {
  host: 'localhost',
  dialect: 'postgres',
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  logging: false,
})

module.exports = db
