const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller.js')
const tokenVerify = require('../middlewares/tokenVerify.js')
router.route('/signup').post(userController.signupController)
router.route('/login').post(userController.loginController)
router.route('/me').get(tokenVerify, userController.getMe)

module.exports = router
