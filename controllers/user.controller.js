const User = require('../models/User')
const {
  signUpService,
  loginService,
  userInfoService,
} = require('../services/user.service')
const bycrypt = require('bcryptjs')
const { generateToken } = require('../util/authToken.js')

exports.signupController = async (req, res, next) => {
  try {
    const signup = await signUpService(req.body)
    res.status(200).json({
      success: true,
      signup,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error,
    })
  }
}
exports.loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Email or password must not be Empty',
      })
    }

    const loginData = await loginService(email, password)
   
    if(loginData.error){
      res.status(400).json({
        success:false,
        error:loginData.error
      })
    }
    res.status(200).json({
      success: true,
      loginData,
    })
  } catch (error) {}
}
exports.getMe = async (req, res, next) => {
  try {
    const getUser = await userInfoService(req.user?.email)
    res.status(200).json({
      success: true,
      getUser,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error,
    })
  }
}
