const { validationResult } = require('express-validator')
const { promisify } = require('util')
const jwt = require('jsonwebtoken')
const signToken = require('../utils/signToken')
const catchAsync = require('../utils/catchAsync')
const checkAuth = require('../utils/checkAuth')
const User = require('../models/user')
const Post = require('../models/post')
const AppError = require('../utils/appError')

exports.signup = catchAsync(async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(errors.array())
  }
  const user = await User.create({ ...req.body })
  if (!user) return next()

  const token = signToken(res, user)
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

  const token = signToken(res, user)
  res.status(200).json({
    status: 'success',
    token,
    // eslint-disable-next-line no-shadow
    data: (({ img, _id, firstName, lastName, email, username }) => ({
      img,
      _id,
      firstName,
      lastName,
      email,
      username,
    }))(user),
  })
})

exports.validate = catchAsync(async (req, res, next) => {
  const token = checkAuth(req)
  if (!token)
    return next(
      new AppError('Authorization required to access this resource...', 401)
    )

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

exports.checkUser = catchAsync(async (req, res, next) => {
  // Gets a user ID in the req object
  const { _id: userId } = req.user
  const { id: targetId } = req.params
  if (userId.toString() === targetId) return next()
  next(new AppError('You do not have permission for this action 🥴', 403))
})

exports.checkAuthor = catchAsync(async (req, res, next) => {
  // get post, get post author id
  const post = await Post.findById(req.params.id)
  if (!post) return next(new AppError('Post not found', 404))

  const author = await User.findById(post.author._id)
  if (!author) return next(new AppError('Author not found', 404))
  const { _id: authorId } = author
  const { id: userId } = req.user

  // check loggedin users id to post author
  if (authorId.toString() !== userId)
    return next(new AppError('You do not have permission for this action', 403))

  next()
})

exports.checkSignIn = catchAsync(async (req, res, next) => {
  const token = checkAuth(req)
  if (token) {
    const data = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
    const user = await User.findById(data.id).select('-passwordUpdated -__v')

    if (user && !user.changedPasswordAfter(data.iat))
      return res.status(200).json({ status: 'success', data: user })
  }

  res.status(200).json({ status: 'success', data: null })
})

exports.signOut = catchAsync(async (req, res, next) => {
  res
    .clearCookie('jwt')
    .status(200)
    .json({ status: 200, data: 'cookie cleared' })
})
