require('dotenv').config({ path: './config.env' })
const express = require('express')

const app = express()

app.get('/', (req, res) => res.send('hey'))

//  8/17 => Write User routes...

module.exports = app
