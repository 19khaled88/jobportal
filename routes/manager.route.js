const express = require('express')
const router = express.Router()
const managerController =require('../controllers/manager.controller.js')
const tokenVerify = require('../middlewares/tokenVerify.js')
const authorize = require('../middlewares/authorization.js')


router.route('/').get(tokenVerify,authorize("manager"),managerController.getManagerJobController)
router.route('/:id').get(tokenVerify,authorize("manager"),managerController.getManagerJobByIdController)
module.exports = router
