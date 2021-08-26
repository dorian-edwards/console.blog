require('dotenv').config({ path: './config.env' })
const express = require('express')
const morgan = require('morgan')
const userRouter = require('./routes/user.routes')
const errorHandler = require('./utils/errorHandler')
const AppError = require('./utils/appError')

const app = express()

app.use(morgan('tiny'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/v1/users', userRouter)
app.all('*', (req, res, next) => {
  next(new AppError(`Can't ${req.method} ${req.originalUrl}`, 404))
})

app.use(errorHandler)

module.exports = app
