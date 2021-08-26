const app = require('./app')
const dbConnect = require('./utils/dbConnect')

const port = process.env.PORT || 3000

dbConnect()

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on http://localhost:${port}
Running in: ${process.env.NODE_ENV}`)
})
