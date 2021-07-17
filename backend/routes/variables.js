const router = require('express').Router()

router.get('/', (req, res) => {
  res.status(200).send({
    TINYMCE_KEY: process.env.TINYMCE_KEY,
    SITE_ADRESS: process.env.SITE_ADRESS,
  })
})

module.exports = router
