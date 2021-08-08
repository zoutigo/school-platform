const express = require('express')
const {
  registerUser,
  loginUser,
  updateUser,
  listUsers,
  viewUser,
  userEmail,
  verifyEmail,
  userLosspass,
} = require('../controllers/userController')

const router = express.Router()
const { tokenVerify } = require('../utils/tokenverify')

// check email availability
router.post('/losspass', userLosspass)

// check email availability
router.post('/checkemail', userEmail)

// verify the user mailbox
router.get('/verification-email', verifyEmail)

/* GET users listing. */
router.get('/', listUsers)

// GET user
router.get('/:id', viewUser)

// POST user , validation done by admin or moderator

router.post('/register', registerUser)

// User Login
router.post('/login', loginUser)

// update user , only when user is already logged
router.post('/:id?', tokenVerify, updateUser)

module.exports = router
