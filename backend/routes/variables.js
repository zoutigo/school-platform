const router = require('express').Router()
const TestP = require('../models/TestP')

router.get('/', async (req, res, next) => {
  try {
    // await UserP.sync({ force: true })
    await TestP.sync({ force: true })

    res.status(200).send({
      TINYMCE_KEY: process.env.TINYMCE_KEY,
      SITE_ADRESS: process.env.SITE_ADRESS,
    })
  } catch (err) {
    return next(err)
  }
})

module.exports = router
