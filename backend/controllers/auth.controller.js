const { validationResult } = require('express-validator')
const { promisify } = require('util')
const jwt = require('jsonwebtoken')
const signToken = require('../utils/signToken')
const catchAsync = require('../utils/catchAsync')
const User = require('../models/user')
const AppError = require('../utils/appError')

exports.signup = catchAsync(async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(errors.array())
  }
  const user = await User.create({ ...req.body })
  if (!user) return next()

  const token = signToken(user)
  res.status(200).json({
    status: 'success',
    token,
    user,
  })
})

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body
  if (!email || !password)
    return next(new AppError('Please enter email address and password', 400))

  // In the user model password select is set to false so it doesn't show up when we select users.
  // .select('+password') overrides this, in this case, so we can compare the password. Without the + symbol, only the _id and password would return
  const user = await User.findOne({ email }).select('+password')

  if (!user || !(await user.checkPassword(password)))
    return next(new AppError('Invalid email or password', 401))

  const token = signToken(user)
  res.status(200).json({
    status: 'success',
    token,
  })
})

exports.validate = catchAsync(async (req, res, next) => {
  // 1) validate authorization header

  const { authorization } = req.headers

  const [bearer, token] = [...authorization.split(' ')]

  if (!authorization || bearer !== 'Bearer' || !token) {
    return next(
      new AppError('Authorization required to access this resource...', 401)
    )
  }

  // 2) verify token

  // eslint-disable-next-line arrow-body-style
  await promisify(jwt.verify)(token, process.env.JWT_SECRET)
    .then(async (data) => {
      // 3) verify user
      const user = await User.findById(data.id)
      if (!user) return next(new AppError('Invalid login: User not found', 401))

      // 4 ) Check if password changed after token
      if (user.changedPasswordAfter(data.iat)) {
        return next(
          new AppError('Credentials no longer valid, please login again', 401)
        )
      }

      req.user = user
      next()
    })
    .catch((err) => next(err))
})
