const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  firstName: {
    type: String,
    required: [true, 'First name required'],
    trim: true,
    lowercase: true,
  },
  lastName: {
    type: String,
    required: [true, 'Last name required'],
    trim: true,
    lowercase: true,
  },
  username: {
    type: String,
    required: [true, 'Username required'],
    unique: true,
    trim: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: [true, 'Email required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password required'],
    minLength: [6, 'Password must be at least 6 characters long'],
  },
})

module.exports = model('User', userSchema)
