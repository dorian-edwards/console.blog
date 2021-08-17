require('dotenv').config({ path: './config.env' })
const express = require('express')
const userRouter = require('./routes/user.routes')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/users', userRouter)

module.exports = app
