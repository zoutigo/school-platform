const router = require('express').Router()
const verifyTokenMiddleware = require('../authModule/middlewares/verifyTokenMiiddleware')
const {
  createDialog,
  getDialog,
  listDialogs,
  putDialog,
  deleteDialog,
} = require('./dialogController')
const postDialogValidator = require('./middlewares/validators/postDialogValidator')
const putDialogValidator = require('./middlewares/validators/putDialogValidator')
const deleteDialogValidator = require('./middlewares/validators/deleteDialogValidator')
const isSuperuserMiddleware = require('../authModule/middlewares/authorizations/isSuperuserMiddleware')
const getDialogValidator = require('./middlewares/validators/getDialogValidator')

//  create dialog
router.post(
  '/',
  verifyTokenMiddleware,
  isSuperuserMiddleware,
  postDialogValidator,
  createDialog
)

// get dialog
router.get('/:uuid', getDialogValidator, getDialog)

// list dialogs
router.get('/', listDialogs)

// put dialog
router.put(
  '/:uuid',
  verifyTokenMiddleware,
  isSuperuserMiddleware,
  putDialogValidator,
  putDialog
)

// delete dialog
router.delete(
  '/:uuid',
  verifyTokenMiddleware,
  isSuperuserMiddleware,
  deleteDialogValidator,
  deleteDialog
)

module.exports = router
