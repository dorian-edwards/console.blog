const { validationResult } = require('express-validator')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')
const User = require('../models/user')

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
  res.send('success!')
})

exports.fetchById = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id)
  if (!user) return next(new AppError('User not found', 404))
  res.status(200).json({
    status: 'success',
    data: user,
  })
})

exports.update = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body)
  res.status(201).json({ status: 'success', data: user })
})

exports.delete = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id)
  if (!user) return next(new AppError(`Could not find this user`, 404))
  res.status(200).json({ status: 'success', data: user })
})
