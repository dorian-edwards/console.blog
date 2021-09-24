module.exports = (req) => {
  const { authorization } = req.headers
  const { jwt } = req.cookies

  if (authorization) {
    const [bearer, token] = authorization.split(' ')
    if (bearer !== 'Bearer' || !token) return false
    return token
  }
  if (jwt) {
    return jwt
  }

  return false
}
