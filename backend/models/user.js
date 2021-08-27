const { Schema, model } = require('mongoose')

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

module.exports = model('User', userSchema)
