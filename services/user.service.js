const User = require('../models/User')
const { generateToken } = require('../util/authToken.js')

exports.signUpService = async (data) => {
  try {
    const result = await User.create(data)
    return result
  } catch (error) {
    return error
  }
}
exports.loginService = async (email, password) => {
  try {
    
    const user = await User.findOne({ email })
   
    if (user === null) {
      return ({error: 'Email address not found'})
    }
    const isPasswordValid = user.passwordCompare(password, user.password)
    if (!isPasswordValid) {
      return ({error: 'Email or password is wrong'})
    }
    const token = await generateToken(user)
    const { password: pwd, ...userInfo } = user.toObject()
    
    return { token, userInfo }
  } catch (error) {}
}
exports.userInfoService = async (email) => {
  try {
    console.log(email)
    const gotUser = await User.findOne({ email }).select('-password -_id')
    return gotUser
  } catch (error) {
    return error
  }
}
