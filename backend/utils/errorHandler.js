module.exports = (err, req, res, next) => {
  const error = { ...err }
  error.message = err.message
  error.status = err.status || 'error'
  error.statusCode = err.statusCode || 500
  error.stack = err.stack

  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
  })
}
