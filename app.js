require('dotenv').config({ path: './config.env' })
const express = require('express')
const path = require('path')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const helmet = require('helmet')
const cors = require('cors')
const authRouter = require('./routes/auth.routes')
const userRouter = require('./routes/user.routes')
const postRouter = require('./routes/post.routes')
const errorHandler = require('./utils/errorHandler')
const AppError = require('./utils/appError')

const app = express()

app.use(helmet())
app.use(morgan('tiny'))
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type, Accept'],
  })
)

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.join('client/build', 'index.html'))
  })
}

app.use('/api/v1/', authRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/posts', postRouter)
app.all('*', (req, res, next) => {
  next(new AppError(`Can't ${req.method} ${req.originalUrl}`, 404))
})

app.use(errorHandler)

module.exports = app
