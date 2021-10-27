// This is placed at the top of our code so we can start listening for uncaughtExceptions
// before the rest of our code is executed
// We don't need the server object because uncaughtException errors
// will not occur asynchronously
process.on('uncaughtException', (err) => {
  const message = 'Uncaught Exception, shutting down ... 🥴'
  // eslint-disable-next-line no-console
  console.log(`${err.name} ${err.message}\n${message}`)
  process.exit(1)
})

const app = require('./app')
const dbConnect = require('./utils/dbConnect')

const port = process.env.PORT || 5000

dbConnect()

const server = app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on http://localhost:${port}
Running in: ${process.env.NODE_ENV}`)
})

process.on('unhandledRejection', (err) => {
  const message = 'Unhandled Rejection, server shutting down ... 🥴'
  // eslint-disable-next-line no-console
  console.log(`${err.name}, ${err.message}\n${message}`)
  // server.close gives the server time to finish any pending requests
  server.close(() => {
    process.exit(1) // <= abrupt exit: 1 implies a failure of some sort. 0 means success.
  })
})
