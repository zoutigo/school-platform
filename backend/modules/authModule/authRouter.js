const router = require('express').Router()
const { login, register } = require('./authController')
const loginValidator = require('./middlewares/validators/loginValidator')
const registerValidator = require('./middlewares/validators/registerValidator')

// Login
router.post('/login', loginValidator, login)

// Register
router.post('/register', registerValidator, register)

module.exports = router
