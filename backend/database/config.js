require('dotenv').config()

module.exports = {
  development: {
    username: process.env.MYSQL_DEV_USER,
    password: process.env.MYSQL_DEV_PASSWORD,
    database: process.env.MYSQL_DEV_DATABASE,
    host: process.env.MYSQL_DEV_HOST,
    dialect: 'mysql',
    debug: true,
    logging: true,
    seederStorage: 'sequelize',
    seederStorageTableName: 'sequelizeData',
    pool: {
      max: 100,
      min: 0,
      // @note https://github.com/sequelize/sequelize/issues/8133#issuecomment-359993057
      acquire: 100 * 1000,
    },
  },
  test: {
    username: process.env.MYSQL_TEST_USER,
    password: process.env.MYSQL_TEST_PASSWORD,
    database: process.env.MYSQL_TEST_DATABASE,
    host: process.env.MYSQL_TEST_HOST,
    dialect: 'mysql',
    debug: true,
    logging: false,
    seederStorage: 'sequelize',
    seederStorageTableName: 'sequelizeData',
    pool: {
      max: 100,
      min: 0,
      // @note https://github.com/sequelize/sequelize/issues/8133#issuecomment-359993057
      acquire: 100 * 1000,
    },
  },

  // production: {
  //   username: process.env.PROD_DB_USERNAME,
  //   password: process.env.PROD_DB_PASSWORD,
  //   database: process.env.PROD_DB_NAME,
  //   host: process.env.PROD_DB_HOSTNAME,
  //   port: process.env.PROD_DB_PORT,
  //   dialect: 'postgres',
  //   dialectOptions: {
  //     bigNumberStrings: true,
  //   },
  // },
}
