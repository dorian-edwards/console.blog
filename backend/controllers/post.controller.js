const Post = require('../models/post')
const User = require('../models/user')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')

exports.fetchAll = catchAsync(async (req, res, next) => {
  const posts = await Post.find()
    .populate({ path: 'author', select: 'username img' })
    .exec()
  if (!posts) return next()
  res.status(200).json({
    status: 'success',
    results: posts.length,
    data: posts,
  })
})

exports.create = catchAsync(async (req, res, next) => {
  const { id } = req.user
  const user = await User.findById(id)
  if (!user) return next(new AppError('User not found', 404))

  const post = await Post.create({ ...req.body, author: id })
  if (!post) return next()
  res.status(200).json({ message: 'status', data: post })
})

exports.fetchSingle = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id)
    .populate({
      path: 'author',
      select: 'username img',
    })
    .exec()
  if (!post) return next(new AppError('Post not found', 404))
  res.status(200).json({ status: 'success', data: post })
})

exports.update = catchAsync(async (req, res, next) => {
  const newPost = { ...req.body }
  if (req.file) newPost.img = req.file.path.slice(6)

  const post = await Post.findByIdAndUpdate(req.params.id, newPost, {
    runValidators: true,
    new: true,
  })
  if (!post) return next(new AppError('Post not found', 404))
  res.status(200).json({ status: 'success', data: post })
})

exports.delete = catchAsync(async (req, res, next) => {
  const post = await Post.findByIdAndDelete(req.params.id)
  if (!post) return next(new AppError('Post not found', 404))
  res.status(204).json({ status: 'success', data: post })
})
