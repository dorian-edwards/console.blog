const { validationResult } = require('express-validator')
const { checkEmail, checkPassword } = require('../validators/userValidation')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')
const User = require('../models/user')
const Post = require('../models/post')

exports.fetchAll = catchAsync(async (req, res, next) => {
  const users = await User.find()
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: users.length === 0 ? 'No results' : users,
  })
})

exports.create = catchAsync(async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(errors.array())
  }
  const user = await User.create({ ...req.body })
  if (!user) return next()
  res.status(200).json({
    status: 'success',
    user,
  })
})

exports.fetchSingle = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id)
  if (!user) return next(new AppError('User not found', 404))
  res.status(200).json({
    status: 'success',
    data: user,
  })
})

exports.update = catchAsync(async (req, res, next) => {
  const { id } = req.params
  const user = await User.findById(id)
  if (!user) return next(new AppError('User not found', 404))

  // if email is contained in req.body, will need to verify it.
  // if password is in body, will need to confirm that it, and confirm password, match

  if (req.body.email) await checkEmail(req)
  if (req.body.password) await checkPassword(req)
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(errors.array())
  }

  user.set({ ...req.body }) // <= seems to be the only way I can change isModified to true so the hashing function will run in the pre hook
  if (req.file) user.set({ img: req.file.path.slice(6) })
  await user.save() // <= triggers my pre hook which doesn't run on findOneAndUpdate
  res.status(204).json({ status: 'success', data: user })
})

exports.delete = catchAsync(async (req, res, next) => {
  const { id } = req.params
  const user = await User.findByIdAndDelete(id)
  if (!user) return next(new AppError(`Could not find this user`, 404))

  await Post.deleteMany({ author: id })
  res.status(200).json({ status: 'success', data: user })
})

exports.fetchByAuthor = catchAsync(async (req, res, next) => {
  const { id } = req.params
  const data = await Post.find({ author: id })
  if (data) {
    return res.status(200).json({
      status: 'success',
      results: data.length,
      data,
    })
  }
  res.status(204).json({
    status: 'success',
    data: null,
  })
})
