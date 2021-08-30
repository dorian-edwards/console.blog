const { Schema, model } = require('mongoose')
const bcrypt = require('bcryptjs')

const saltRounds = 12

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  username: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: String,
  confirmPassword: String,
})

userSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next()
  bcrypt.hash(this.password, saltRounds, (err, hash) => {
    if (err) next(err)

    this.password = hash
    this.confirmPassword = undefined
    next()
  })
})

module.exports = model('User', userSchema)
