const { Schema, model } = require('mongoose')
const bcrypt = require('bcryptjs')

const saltRounds = 12

const userSchema = new Schema({
  firstName: {
    type: String,
    trim: true,
    lowercase: true,
    required: [true, 'Please enter your first name'],
  },
  lastName: {
    type: String,
    trim: true,
    lowercase: true,
    required: [true, 'Please enter your last name'],
  },
  username: {
    type: String,
    trim: true,
    lowercase: true,
    required: [true, 'Please enter your username'],
    unique: true,
  },
  email: {
    type: String,
    trim: true,
    required: [true, 'Please enter a valid email address'],
    unique: true,
  },
  password: {
    type: String,
    trim: true,
    required: [true, 'Please enter a password at least 6 characters in length'],
    minLength: [6, 'Please enter a password at least 6 characters in length'],
    select: false,
  },
  confirmPassword: String,
})

userSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next()
  bcrypt.hash(this.password, saltRounds, (err, hash) => {
    if (err) return next(err)

    this.password = hash
    this.confirmPassword = undefined
    next()
  })
})

userSchema.virtual('fullname').get(function () {
  return `${this.firstname} ${this.lastName}`
})

module.exports = model('User', userSchema)
