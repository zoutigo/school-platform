const Sequelize = require('sequelize')

require('dotenv').config()

const dbase = new Sequelize(
  process.env.PGDB_NAME,
  process.env.PGDB_USER,
  process.env.PGDB_PASSWORD,
  {
    host: process.env.PGDB_HOST,
    dialect: 'postgres',
    operatorsAliases: 0,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    logging: false,
  }
)

module.exports = dbase
