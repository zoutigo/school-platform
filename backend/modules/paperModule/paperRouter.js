const router = require('express').Router()
const multer = require('multer')

const verifyTokenMiddleware = require('../authModule/middlewares/verifyTokenMiiddleware')
const {
  createPaper,
  getPaper,
  listPapers,
  putPaper,
  deletePaper,
} = require('./paperController')
const getPaperValidator = require('./middlewares/validators/getPaperValidator')
const putPaperValidator = require('./middlewares/validators/putPaperValidator')
const deletePaperValidator = require('./middlewares/validators/deletePaperValidator')
const postPaperValidator = require('./middlewares/validators/postPaperValidator')
const paperAuthorization = require('./middlewares/paperAuthorization')
const uploadFilesMiddleware = require('../../middlewares/uploadFilesMiddleware')

//  create paper
router.post(
  '/',
  verifyTokenMiddleware,
  uploadFilesMiddleware(),
  postPaperValidator,
  paperAuthorization,
  createPaper
)

// get paper
router.get('/:uuid', getPaperValidator, getPaper)

// list papers
router.get('/', listPapers)

// put paper
router.put(
  '/:uuid',
  verifyTokenMiddleware,
  uploadFilesMiddleware(),
  paperAuthorization,
  putPaperValidator,
  putPaper
)

// delete paper
router.delete(
  '/:uuid',
  verifyTokenMiddleware,
  deletePaperValidator,
  paperAuthorization,
  deletePaper
)

module.exports = router
