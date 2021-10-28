const jwt = require('jsonwebtoken')

const signToken = (res, user) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  })

  res.cookie('jwt', token, {
    expires: new Date(Date.now() + 3 * 60 * 60 * 1000),
    httpOnly: true,
    sameSite: 'lax',
    secure: true,
    domain: 'https://consoledotblog.netlify.app',
  })

  return token
}

module.exports = signToken
