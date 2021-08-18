const User = require('../models/user')

exports.fetchAll = async (req, res) => {
  const users = await User.find()
  res
    .status(200)
    .json({ status: 'success', results: users.length, data: users })
}

exports.create = async (req, res) => {
  const newUser = await User.create({ ...req.body })
  res.status(201).json({ status: 'success', data: newUser })
}

exports.fetchById = async (req, res) => {
  res.status(200).json({
    status: 'success',
    data: `Fetch single user id: ${req.params.id}`,
  })
}

exports.update = async (req, res) => {
  res
    .status(201)
    .json({ status: 'success', data: `Update user: ${req.params.id}` })
}

exports.delete = async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id)
  if (!user) {
    return res.status(400).json({ status: 'fail', message: 'User not found' })
  }
  res.status(200).json({ status: 'success', data: user })
}
