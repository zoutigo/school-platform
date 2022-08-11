const map = require('lodash/map')
const db = require('../database/models')
const models = require('../database/models')

const truncate = async () => {
  try {
    await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
    await db.sequelize.sync({ force: true })
    await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 1')

    // await Promise.all(
    //   map(Object.keys(models), (key) => {
    //     if (['sequelize', 'Sequelize'].includes(key)) return null
    //     return models[key].destroy({ where: {}, force: true })
    //   })
    // )
  } catch (error) {
    console.log(error)
  }
}

module.exports = truncate
