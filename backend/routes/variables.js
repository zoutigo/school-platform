const router = require('express').Router()

router.get('/', (req, res) => {
  res.status(200).send({
    TINYMCE_KEY: process.env.TINYMCE_KEY,
  })
})

module.exports = router
