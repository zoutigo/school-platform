const router = require('express').Router()

require('dotenv').config()

router.get('/', async (req, res, next) => {
  res.status(200).send({
    TINYMCE_KEY: process.env.TINYMCE_KEY,
    SITE_ADRESS: process.env.SITE_ADRESS,
    version: '1.1.5',
  })
})

module.exports = router
