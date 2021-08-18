const mongoose = require('mongoose')

const uri = process.env.URI

module.exports = () => {
  mongoose.connect(
    uri,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    },
    (err) => {
      // eslint-disable-next-line no-console
      if (err) return console.log({ message: err.message })
      // eslint-disable-next-line no-console
      console.log(`Database connected`)
    }
  )
}
