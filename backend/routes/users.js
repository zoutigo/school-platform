const express = require('express')
const {
  registerUser,
  loginUser,
  updateUser,
  listUsers,
  viewUser,
  userEmail,
} = require('../controllers/userController')

const router = express.Router()
const { tokenVerify } = require('../utils/tokenverify')

// get the team

router.get('/team', (req, res) => {
  res.send('here is the team')
})

// check email
router.post('/checkemail', userEmail)

/* GET users listing. */
router.get('/', listUsers)

// GET user
router.get('/:id', viewUser)

// POST user , validation done by admin or moderator

router.post('/register', registerUser)

// User Login
router.post('/login', loginUser)

// update user , only when user is already logged
router.post('/:id', tokenVerify, updateUser)

module.exports = router
