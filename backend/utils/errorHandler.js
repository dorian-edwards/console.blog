const AppError = require('./appError')

const handleCastError = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`
  return new AppError(message, 400)
}

const handleDuplicateError = (err) => {
  const [key, value] = Object.entries(err.keyValue)[0]

  const message = `${key} ${value} is already in use. Please choose another ${key}.`

  return new AppError(message, 400)
}

const handleValidationError = (err) => {
  const message = []

  Object.keys(err.errors).forEach((key) => {
    message.push(err.errors[key].message)
  })

  return new AppError(message.join(', '), 400)
}

const handleExpressValidatorError = (err) => {
  const message = []
  err.forEach((error) => {
    message.push(error.msg)
  })

  return new AppError(message.join(', '), 400)
}

const handleJWTError = () =>
  new AppError("🥴 oops! Something's amiss, please log in again", 500)

const handleJWTExpiration = () =>
  new AppError(`Your login has expired, please login again`, 401)

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
  })
}

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    })
  }

  res.status(500).json({
    status: 'Error',
    message: `🤦🏿‍♂️ Internal Server Error`,
  })

  // eslint-disable-next-line no-console
  console.log({ err, stack: err.stack })
}

module.exports = (err, req, res, next) => {
  let error = { ...err }
  error.statusCode = err.statusCode || 500
  error.status = err.status || 'error'
  error.message = err.message
  error.stack = err.stack

  if (process.env.NODE_ENV === 'development') {
    return sendErrorDev(error, res)
  }

  // handle mongoose errors
  if (err.name === 'ValidationError') error = handleValidationError(error)
  if (err.name === 'CastError') error = handleCastError(error)
  if (err.code === 11000) error = handleDuplicateError(error)

  // handle express validator errors
  if (Array.isArray(err)) error = handleExpressValidatorError(err)

  // handle jwt errors
  if (err.name === 'JsonWebTokenError') error = handleJWTError()
  if (err.name === 'TokenExpiredError') error = handleJWTExpiration()

  sendErrorProd(error, res)
}
