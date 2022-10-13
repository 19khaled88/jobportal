const express = require('express')
const router = express.Router()
const jobController = require('../controllers/job.controller.js')
const tokenVerify = require('../middlewares/tokenVerify.js')
const authorize = require('../middlewares/authorization.js')

router.route('/:id/apply').post(tokenVerify, jobController.jobApplyController)
router
  .route('/:id')
  .patch(tokenVerify, authorize('manager'), jobController.jobEditController)
router.route('/:id').get(jobController.jobGetByIdController)
router.route('/').get(jobController.jobGetController)
router
  .route('/')
  .post(tokenVerify, authorize('manager'), jobController.jobPostController)
module.exports = router
