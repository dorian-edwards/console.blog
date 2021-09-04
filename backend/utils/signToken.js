const jwt = require('jsonwebtoken')

const signToken = (user) => {
  const token = jwt.sign(
    { username: user.username, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRY }
  )
  return token
}

module.exports = signToken
