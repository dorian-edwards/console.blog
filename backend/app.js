require('dotenv').config({ path: './config.env' })
const express = require('express')
const morgan = require('morgan')
const userRouter = require('./routes/user.routes')

const app = express()

app.use(morgan('tiny'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/v1/users', userRouter)
app.all('*', (req, res) => {
  res.status(404).json({
    status: 'fail',
    message: 'Page not found',
  })
})

module.exports = app
