const mongoose = require('mongoose')
const Post = require('../models/post')
const User = require('../models/user')
const Comment = require('../models/comment')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')

exports.fetchAll = catchAsync(async (req, res, next) => {
  const posts = await Post.find().populate({
    path: 'author',
    select: 'username img',
  })
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
  const { id } = req.params
  const post = await Post.findByIdAndDelete(id)
  if (!post) return next(new AppError('Post not found', 404))
  await Comment.deleteMany({ post: id })
  res.status(204).json({ status: 'success', data: post })
})

exports.toggleLike = catchAsync(async (req, res) => {
  const { id } = req.user
  const post = await Post.findById(req.params.id)

  const index = post.likes.indexOf(mongoose.Types.ObjectId(id))
  if (index === -1) {
    post.likes.push(id)
  } else {
    post.likes.splice(index, 1)
  }

  await post.save()
  res.status(200).json({ status: 'success', data: post })
})

exports.addComment = catchAsync(async (req, res) => {
  const comment = new Comment({
    post: req.params.id,
    author: req.user._id,
    ...req.body,
  })
  await comment.save()
  res.status(200).json({ status: 200, data: comment })
})

exports.getComments = catchAsync(async (req, res) => {
  const comments = await Comment.find({ post: req.params.id })
    .populate({
      path: 'author',
      select: 'username',
    })
    .sort({ createdAt: 'desc' })
  res.status(200).json({
    status: 'success',
    results: comments.length,
    data: comments,
  })
})
