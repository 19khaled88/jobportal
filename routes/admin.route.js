const express = require('express')
const router = express.Router()
const adminController = require('../controllers/admin.controller.js')
const tokenVerify = require('../middlewares/tokenVerify.js')
const authorize = require('../middlewares/authorization.js')


router.route('/hiringManager').get(tokenVerify,authorize('admin'),adminController.getHiringManager)
router.route('/changeRole/:id').patch(tokenVerify,authorize('admin'),adminController.updateRole)
router.route('/:id').get(tokenVerify,authorize('admin'),adminController.getCandidateById)
router.route('/').get(tokenVerify,authorize('admin'),adminController.getCandidate)
module.exports = router