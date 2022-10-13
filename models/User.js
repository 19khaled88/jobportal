const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const { ObjectId } = mongoose.Schema.Types
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    role: {
      type: String,
      enum: ['candidate', 'manager', 'admin'],
      default: 'candidate',
    },
    postedJobs: [
      {
        type: ObjectId,
        ref: 'Job',
      },
    ],
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    timestamps: true,
  },
)

userSchema.pre('save', function (next) {
  const password = this.password
  const hashedPassword = bcrypt.hashSync(password)
  this.password = hashedPassword

  next()
})

userSchema.methods.passwordCompare = function (password, hashPass) {
  const isPasswordValid = bcrypt.compareSync(password, hashPass)
  return isPasswordValid
}

const User = mongoose.model('User', userSchema)

module.exports = User
