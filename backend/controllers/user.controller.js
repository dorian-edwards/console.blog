exports.fetchAll = async (req, res) => {
  res.status(200).json({ status: 'success', data: 'Fetch all users' })
}

exports.create = async (req, res) => {
  res.status(201).json({ status: 'success', data: req.body })
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
  res
    .status(204)
    .json({ status: 'success', data: `Delete user: ${req.params.id}` })
}
