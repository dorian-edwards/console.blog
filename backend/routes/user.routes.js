const express = require('express')

const router = express.Router()

router
  .route('/')
  .get(async (req, res) => {
    res.status(200).json({ status: 'success', data: 'Fetch all users' })
  })
  .post(async (req, res) => {
    res.status(201).json({ status: 'success', data: 'Create new user' })
  })

router
  .route('/:id')
  .get(async (req, res) => {
    res.status(200).json({ status: 'success', data: 'Fetch single resource' })
  })
  .patch(async (req, res) => {
    res.status(201).json({ status: 'success', data: 'Upate user' })
  })
  .delete(async (req, res) => {
    res.status(204).json({ status: 'success', data: 'Create new user' })
  })

module.exports = router
