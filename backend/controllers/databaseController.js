const db = require('../config/database')
const TestP = require('../models/TestP')
const UserP = require('../models/UserP')

module.exports.synchronizeDb = async (req, res, next) => {
  try {
    // await UserP.sync({ force: true })
    await TestP.sync({ force: true })

    res.status(200).send('User Model Synchronized')
  } catch (err) {
    return next(err)
  }
}
