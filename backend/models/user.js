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
  img: {
    type: String,
    trim: true,
    default: 'assets/img/default.png',
  },
  password: {
    type: String,
    trim: true,
    required: [true, 'Please enter a password at least 6 characters in length'],
    minLength: [6, 'Please enter a password at least 6 characters in length'],
    select: false,
  },
  confirmPassword: String,
  passwordUpdated: Date,
})

userSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next()
  bcrypt.hash(this.password, saltRounds, (err, hash) => {
    if (err) return next(err)

    this.password = hash
    this.confirmPassword = undefined
    this.passwordUpdated = Date.now()
    next()
  })
})

userSchema.virtual('fullname').get(function () {
  return `${this.firstname} ${this.lastName}`
})

userSchema.methods.checkPassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

userSchema.methods.changedPasswordAfter = function (issueTime) {
  const updatedAt = Math.round(this.passwordUpdated.getTime() / 1000)
  return updatedAt > issueTime
}

module.exports = model('User', userSchema)
